import { error } from '@sveltejs/kit';
import { places } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { Place } from './types.d';

export const prerender = true;

export const load = async () => {
	const formattedPlaces: Place[] = [];

	await places.find().forEach(({ city, institution, coordinates, shortId }) => {
		formattedPlaces.push({
			city: translate(city, AppLanguage.pl),
			institution: {
				...institution,
				name: translate(institution.name, AppLanguage.pl)
			},
			coordinates,
			shortId
		});
	});

	if (!formattedPlaces?.length) {
		throw error(404, 'No places found');
	}

	return { places: formattedPlaces };
};
