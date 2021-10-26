import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type EditorialFormValues = {
	cooperation: string[] | null;
	contract: string | null;
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
	contract?: string;
	isContract?: true;
	// -----------
	style?: LanguageValue[];
	alcoholScope?: AlcoholScope;
	filtration?: boolean;
	pasteurization?: boolean;
	// -----------
	notes?: string;
};
