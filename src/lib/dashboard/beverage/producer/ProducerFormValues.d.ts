import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import { Fermentation } from '$lib/utils/enums/Beverage.enum';

export type ProducerFormValues = {
	series: {
		language: string;
		value: string;
	}[];
	cooperation: string[] | null;
	contract: string | null;
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	// -----------
	fermentation: Fermentation[] | null;
	style: LanguageValue[];
	extract: {
		value: string | null;
		unit: ExtractUnit | null;
		relate: ExtractRelate | null;
	};
	alcohol: {
		value: string | null;
		unit: AlcoholUnit | null;
		relate: AlcoholRelate | null;
		scope: AlcoholScope | '--' | null;
	};
	filtration: boolean | null;
	pasteurization: boolean | null;
	// -----------
	price: {
		currency: string;
		date: string;
		shop: string | null;
		value: string;
	}[];
};

export type ProducerFormOutput = {
	series?: {
		language?: string;
		value: string;
	}[];
	cooperation?: InstitutionInsideBeverage[];
	contract?: string;
	isContract?: true;
	tale?: Tale[];
	// -----------
	fermentation?: Fermentation[];
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
	price?: Price[];
};
