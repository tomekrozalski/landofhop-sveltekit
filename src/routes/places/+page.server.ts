import { error } from '@sveltejs/kit';
import { places } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { RawPlace } from '$types/RawPlace.d';
import type { LanguageValue } from '$types/LanguageValue';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const formattedPlaces = [];

	await places
		.find(
			{},
			{
				projection: {
					_id: 0,
					city: 1,
					location: 1,
					institution: 1,
					country: 1,
					shortId: 1
				}
			}
		)
		.forEach(({ city, location, institution, country, shortId }: RawPlace) => {
			if (location) {
				formattedPlaces.push({
					shortId,
					latitude: +location.coordinates[0],
					longitude: +location.coordinates[1]
				});
			}
		});

	// if (!formattedInsitutions?.length) {
	// 	throw error(404, 'No institution found');
	// }

	return {
		formattedPlaces
	};
};
