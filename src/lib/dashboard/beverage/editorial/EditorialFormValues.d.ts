import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import {
	AgedPreviousContent,
	AgedTimeUnit,
	AgedType,
	AgedWood,
	AlcoholScope,
	Clarity,
	Fermentation
} from '$lib/utils/enums/Beverage.enum';

export type EditorialFormValues = {
	cooperation: string[] | null;
	contract: string | null;
	place: string | null;
	remark: {
		language: string;
		value: string;
	}[];
	// -----------
	fermentation: Fermentation[] | null;
	style: {
		language: string;
		value: string;
	}[];
	alcoholScope: AlcoholScope | null;
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
	nitrogen: boolean | null;
	// -----------
	color: string | null;
	clarity: Clarity | null;
	// -----------
	price: {
		currency: string;
		date: string;
		shop: string | null;
		value: string;
	}[];
	notes: string | null;
};

export type EditorialFormOutput = {
	cooperation?: InstitutionInsideBeverage[];
	contract?: string;
	isContract?: true;
	place?: {
		city: LanguageValue[];
		country: string;
		shortId: string;
	};
	remark?: LanguageValue[];
	// -----------
	fermentation?: Fermentation[];
	style?: LanguageValue[];
	alcoholScope?: AlcoholScope;
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
	nitrogen?: boolean;
	// -----------
	color?: string;
	clarity?: Clarity;
	// -----------
	price?: Price[];
	notes?: string;
};
