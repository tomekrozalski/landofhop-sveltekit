import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { places } from '$db/mongo';
import type { RawPlace } from '$types/RawPlace.d';
import type { Input } from '$lib/templates/modals/UpdatePlace/types.d';

export const GET: RequestHandler = async ({ params }) => {
	const shortId = params.shortId ?? '';
	const data: RawPlace | null = await places.findOne({ shortId });

	if (!data) {
		throw error(404, 'Place not found');
	}

	return json({
		city: data.city,
		country: data.country,
		institution: data.institution.shortId,

		coordinates: {
			latitude: data.coordinates?.[0]?.toString() ?? '', /// @ToDo: to remove, coordinates are required
			longitude: data.coordinates?.[1]?.toString() ?? '' /// @ToDo: to remove, coordinates are required
		}
	} as Input);
};
