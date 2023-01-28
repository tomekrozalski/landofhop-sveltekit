import { get } from 'svelte/store';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateShortId } from '$lib/utils/api';
import type { RawPlace } from '$types/RawPlace';
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

	const data: RawPlace[] = [];

	await places
		.find(
			{},
			{
				projection: {
					_id: 0,
					city: 1,
					country: 1,
					institution: 1,
					coordinates: 1,
					shortId: 1
				}
			}
		)
		.toArray();

	return json(data);
};
