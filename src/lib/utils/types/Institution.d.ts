import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type InstitutionInsideBeverage = {
	badge: string;
	name: LanguageValue[];
	owner?: InstitutionInsideBeverage;
	shortId: string;
};

export type InstitutionRaw = {
	badge: string;
	name: LanguageValue[];
	owner?: InstitutionEssence;
	website?: string;
};

export type InstitutionEssence = InstitutionRaw & { shortId: string };

export type Institution = InstitutionEssence & { _id: string };
