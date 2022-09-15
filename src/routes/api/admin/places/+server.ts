import { json as json$1 } from '@sveltejs/kit';
import { generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawPlaceWithoutId } from '$lib/utils/types/api/RawPlace';

export async function POST({ locals, request }) {
	const placeData = await request.json();
	const { places } = await getDbCollections();

	if (!locals.authenticated) {
		return json$1({
			message: 'Unauthorized. Cannot add place'
		}, {
			status: 401
		});
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

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// Suggestion (check for correctness before using):
	// return json$1(data);
	return { body: data };
}
