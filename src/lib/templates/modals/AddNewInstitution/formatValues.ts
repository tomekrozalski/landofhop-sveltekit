import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, owner, website }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueToDb(name),
		...(owner && { owner: formatInstitutionByShortId(owner) }),
		...(website && { website: website.replace(/http(s)?:\/\//, '') })
	};
}
