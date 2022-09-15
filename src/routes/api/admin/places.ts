import { generateShortId, getDbCollections } from '$lib/utils/api';
import type { RawPlaceWithoutId } from '$lib/utils/types/api/RawPlace';

export async function POST({ locals, request }) {
	const placeData = await request.json();
	const { places } = await getDbCollections();

	if (!locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unauthorized. Cannot add place'
			}
		};
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

	return { body: data };
}
