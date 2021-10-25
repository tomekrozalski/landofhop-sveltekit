import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type EditorialFormValues = {
	cooperation: string[] | null;
	// -----------
	style: LanguageValue[];
	alcoholScope: AlcoholScope | null;
	filtration: boolean | null;
	pasteurization: boolean | null;
	// -----------
	notes: string | null;
};

export type EditorialFormOutput = {
	cooperation?: InstitutionInsideBeverage[];
	// -----------
	style?: LanguageValue[];
	alcoholScope?: AlcoholScope;
	filtration?: boolean;
	pasteurization?: boolean;
	// -----------
	notes?: string;
};
