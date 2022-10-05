import type { InstitutionRaw } from '$lib/utils/types/Institution';
import {
	formatInstitutionByShortId,
	formatLanguageValueArray
} from '$lib/utils/helpers/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	owner: string | null;
	website: string | null;
};

export default function formatValues({ badge, name, owner, website }: Input): InstitutionRaw {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		...(owner && { owner: formatInstitutionByShortId(owner) }),
		...(website && { website: website.replace(/http(s)?:\/\//, '') })
	};
}
