import type { LanguageValue } from '$types/LanguageValue.d';

export type InstitutionDetails = {
	name: LanguageValue;
	owner?: {
		badge: string;
		name: LanguageValue;
		website?: string;
	};
	website?: string;
};
