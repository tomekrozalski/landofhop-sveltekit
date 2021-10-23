import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';

export type ProducerFormValues = {
	series: {
		language: string;
		value: string;
	}[];
	cooperation: string[] | null;
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	// -----------
	filtration: boolean | null;
	pasteurization: boolean | null;
};

export type ProducerFormOutput = {
	series?: {
		language?: string;
		value: string;
	}[];
	cooperation?: InstitutionInsideBeverage[];
	tale?: Tale[];
	// -----------
	filtration?: boolean;
	pasteurization?: boolean;
};
