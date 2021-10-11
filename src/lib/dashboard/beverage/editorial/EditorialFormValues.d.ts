import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type EditorialFormValues = {
	cooperation: string[] | null;
};

export type EditorialFormOutput = {
	cooperation?: InstitutionInsideBeverage[];
};
