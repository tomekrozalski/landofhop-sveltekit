import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type EditorialFormValues = {
	cooperation: string[] | null;
	notes: string | null;
};

export type EditorialFormOutput = {
	cooperation?: InstitutionInsideBeverage[];
	notes?: string;
};
