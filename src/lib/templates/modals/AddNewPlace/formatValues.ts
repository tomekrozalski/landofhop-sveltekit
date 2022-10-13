import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import formatLanguageValueArray from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ city, country, institution, coordinates }: Input): Output {
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
