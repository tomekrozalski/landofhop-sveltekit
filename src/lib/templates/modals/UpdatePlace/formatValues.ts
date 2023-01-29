import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ city, country, institution, coordinates }: Input): Output {
	return {
		city: formatLanguageValueToDb(city),
		country,
		institution: formatInstitutionByShortId(institution, true),
		coordinates: [+coordinates.latitude, +coordinates.longitude]
	};
}
