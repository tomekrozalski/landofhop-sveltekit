import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateShortId } from '$lib/utils/api';
import type { RawPlaceWithoutId } from '$types/api/RawPlace';
import authentication from '$lib/utils/stores/authentication';
import { places } from '$db/mongo';

export const POST: RequestHandler = async ({ request }) => {
	const placeData = await request.json();

	if (!get(authentication).isLoggedIn) {
		throw error(401, 'Unauthorized. Cannot add place');
	}

	await places.insertOne({
		...placeData,
		shortId: generateShortId()
	});

	const data: RawPlaceWithoutId[] = [];

	await places.find().forEach(({ city, country, institution, location, shortId }) => {
		data.push({
			city,
			country,
			institution,
			...(location && {
				location: {
					type: location.type,
					coordinates: [+location.coordinates[0], +location.coordinates[1]]
				}
			}),
			shortId
		});
	});

	return json(data);
};
