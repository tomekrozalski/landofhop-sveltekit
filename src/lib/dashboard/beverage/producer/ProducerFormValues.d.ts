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
	style: LanguageValue[];
	extract: {
		value: number | null;
		unit: ExtractUnit | null;
		relate: ExtractRelate | null;
	};
	alcohol: {
		value: number | null;
		unit: AlcoholUnit | null;
		relate: AlcoholRelate | null;
		scope: AlcoholScope | '--' | null;
	};
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
	style?: LanguageValue[];
	extract?: {
		value: number;
		unit: ExtractUnit;
		relate: ExtractRelate;
	};
	alcohol?: {
		value: number;
		unit: AlcoholUnit;
		relate: AlcoholRelate;
		scope?: AlcoholScope;
	};
	filtration?: boolean;
	pasteurization?: boolean;
};
