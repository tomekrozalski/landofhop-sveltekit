import { error } from '@sveltejs/kit';
import countries from 'i18n-iso-countries';
import pl from 'i18n-iso-countries/langs/pl.json';
import { places } from '$db/mongo';
import { translate } from '$lib/utils/api';
import { AppLanguage } from '$types/enums/Globals.enum';
import type { Place } from './types.d';
import type { PageServerLoad } from './$types';

export const prerender = true;

countries.registerLocale(pl);

export const load: PageServerLoad = async () => {
	const formattedPlaces: Place[] = [];

	await places.find().forEach(({ city, country, institution, coordinates, shortId }) => {
		formattedPlaces.push({
			city: translate(city, AppLanguage.pl),
			country: countries.getName(country, 'pl', { select: 'official' }),
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
