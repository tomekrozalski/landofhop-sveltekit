import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';

export type ProducerFormValues = {
	series: {
		language: string;
		value: string;
	}[];
	cooperation: string[] | null;
};

export type ProducerFormOutput = {
	series?: {
		language?: string;
		value: string;
	}[];
	cooperation?: InstitutionInsideBeverage[];
};
