import { json } from '@sveltejs/kit';
import { getDbCollections } from '$lib/utils/api';
import type { RawPlaceWithoutId } from '$lib/utils/types/api/RawPlace';

export async function GET() {
	const { places } = await getDbCollections();

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
}
