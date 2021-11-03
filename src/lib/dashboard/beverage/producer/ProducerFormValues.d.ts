import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { Fermentation } from '$lib/utils/enums/Beverage.enum';

export type ProducerFormValues = {
	series: {
		language: string;
		value: string;
	}[];
	cooperation: string[] | null;
	contract: string | null;
	place: string | null;
	remark: {
		language: string;
		value: string;
	}[];
	tale: {
		article: string;
		language: string;
		lead: string;
	}[];
	// -----------
	fermentation: Fermentation[] | null;
	style: {
		language: string;
		value: string;
	}[];
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
	hopRate: {
		value: string | null;
		unit: string | null;
	};
	expirationDate: {
		value: string | null;
		unit: string | null;
	};
	// -----------
	bitterness: string | null;
	sweetness: string | null;
	fullness: string | null;
	power: string | null;
	hoppyness: string | null;
	temperature: {
		from: string | null;
		to: string | null;
		unit: string | null;
	};
	// -----------
	price: {
		currency: string;
		date: string;
		shop: string | null;
		value: string;
	}[];
};

export type ProducerFormOutput = {
	series?: LanguageValue[];
	cooperation?: InstitutionInsideBeverage[];
	contract?: string;
	isContract?: true;
	place?: {
		city: LanguageValue[];
		country: string;
		shortId: string;
	};
	remark?: LanguageValue[];
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
	hopRate?: {
		value: number;
		unit: string;
	};
	expirationDate?: {
		value: number;
		unit: string;
	};
	// -----------
	bitterness?: number;
	sweetness?: number;
	fullness?: number;
	power?: number;
	hoppyness?: number;
	temperature?: {
		from: number;
		to: number;
		unit: string;
	};
	// -----------
	price?: Price[];
};
