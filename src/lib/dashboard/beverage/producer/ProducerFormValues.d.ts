import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import type { Tale } from '$lib/utils/types/Beverage/fragments/Tale';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import {
	AgedPreviousContent,
	AgedTimeUnit,
	AgedType,
	AgedWood,
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	ExtractRelate,
	ExtractUnit,
	Fermentation
} from '$lib/utils/enums/Beverage.enum';

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
	aged: {
		previousContent: AgedPreviousContent[];
		time: {
			value: string;
			unit: AgedTimeUnit;
		};
		type: AgedType | null;
		wood: AgedWood | null;
	}[];
	dryHopped: string[] | null;
	hopRate: {
		value: string | null;
		unit: string | null;
	};
	nitrogen: boolean | null;
	expirationDate: {
		value: string | null;
		unit: string | null;
	};
	// -----------
	ingredients: {
		complete: boolean;
		language: string;
		list: string[];
	}[];
	ingredientTags: string[] | null;
	smokedMalt: boolean | null;
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
	aged?: {
		previousContent?: AgedPreviousContent[];
		time?: {
			value: number;
			unit: AgedTimeUnit;
		};
		type?: AgedType;
		wood?: AgedWood;
	}[];
	isDryHopped?: boolean;
	dryHopped?: {
		badge: string;
		name: LanguageValue[];
		type: IngredientType;
	}[];
	hopRate?: {
		value: number;
		unit: string;
	};
	nitrogen?: boolean;
	expirationDate?: {
		value: number;
		unit: string;
	};
	// -----------
	ingredients?: {
		complete: boolean;
		language: string;
		list: string[];
	}[];
	ingredientTags?: {
		badge: string;
		name: LanguageValue[];
		type: IngredientType;
	}[];
	smokedMalt?: boolean;
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
