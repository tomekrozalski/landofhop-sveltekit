import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { places } from '$db/mongo';
import type { RawPlace } from '$types/RawPlace';

export const GET: RequestHandler = async () => {
	const data: RawPlace[] = [];

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
