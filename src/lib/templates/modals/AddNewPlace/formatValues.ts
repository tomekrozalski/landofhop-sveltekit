import type { PlaceRaw } from '$lib/utils/types/Place';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/utils/helpers/dataNormalizers';

type Input = {
	city: {
		value: string;
		language: string;
	}[];
	country: string;
	institution: string;
	coordinates: {
		longitude: string | null;
		latitude: string | null;
	};
};

export default function formatValues({ city, country, institution, coordinates }: Input): PlaceRaw {
	return {
		city: formatLanguageValueArray(city),
		country,
		institution: formatInstitutionByShortId(institution),
		...(coordinates.latitude !== null &&
			coordinates.longitude !== null && {
				location: {
					type: 'Point',
					coordinates: [+coordinates.latitude, +coordinates.longitude]
				}
			})
	};
}
