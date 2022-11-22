import formatInstitutionByShortId from '$lib/utils/normalizers/institution';
import { formatLanguageValueToDb } from '$lib/utils/normalizers/language';
import type { Input, Output } from './types.d';

const formatValues = ({ badge, name, owner, website }: Input): Output => ({
	badge: badge.trim(),
	name: formatLanguageValueToDb(name),
	...(owner && { owner: formatInstitutionByShortId(owner) }),
	...(website && { website: website.replace(/http(s)?:\/\//, '') }),
	statsData: {
		beverages: 0,
		asCooperator: 0,
		asContractor: 0,
		points: {
			value: 0,
			ranking: 0
		}
	}
});

export default formatValues;
