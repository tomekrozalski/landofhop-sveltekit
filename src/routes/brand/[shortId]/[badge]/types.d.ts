import type { LanguageValue } from '$types/LanguageValue.d';
import type { Basics } from '$lib/templates/BeverageList/Basics.d';

export type InstitutionDetails = {
	name: LanguageValue;
	owner?: {
		badge: string;
		name: LanguageValue;
		website?: string;
	};
	website?: string;
};

export type BrandTimelineData = { date: string; beverages?: Basics[] };
