import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import formatLanguageValueArray from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, owner, website }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		...(owner && { owner: formatInstitutionByShortId(owner) }),
		...(website && { website: website.replace(/http(s)?:\/\//, '') })
	};
}
