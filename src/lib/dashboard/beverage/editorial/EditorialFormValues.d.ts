import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type EditorialFormValues = {
	cooperation: string[] | null;
	// -----------
	filtration: boolean | null;
	pasteurization: boolean | null;
	// -----------
	notes: string | null;
};

export type EditorialFormOutput = {
	cooperation?: InstitutionInsideBeverage[];
	// -----------
	filtration?: boolean;
	pasteurization?: boolean;
	// -----------
	notes?: string;
};
