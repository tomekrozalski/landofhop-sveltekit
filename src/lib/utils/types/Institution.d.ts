import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type InstitutionRaw = {
	badge: string;
	name: LanguageValue[];
	owner?: InstitutionEssence;
	website?: string;
};

export type InstitutionEssence = InstitutionRaw & { shortId: string };

export type Institution = InstitutionEssence & { _id: string };

export type InstitutionDetails = {
	name: LanguageValue[];
	owner?: InstitutionDetails;
	website?: string;
};
