import type { LanguageValue } from '$types/LanguageValue.d';
import {
	AgedPreviousContent,
	AgedTimeUnit,
	AgedType,
	AgedWood,
	AlcoholScope,
	Clarity,
	Currency,
	Fermentation,
	IngredientType
} from '$types/enums/Beverage.enum';

export type EditorialFormValues = {
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
	// -----------
	fermentation: Fermentation[] | null;
	styleTags: string[] | null;
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
	rateBeer: string | null;
	untappd: string | null;
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
	series?: LanguageValue[];
	cooperation?: {
		badge: string;
		name: LanguageValue[];
		shortId: string;
		owner?: {
			badge: string;
			name: LanguageValue[];
			shortId: string;
		};
	}[];
	contract?: {
		badge: string;
		name: LanguageValue[];
		shortId: string;
		owner?: {
			badge: string;
			name: LanguageValue[];
			shortId: string;
		};
	};
	isContract?: true;
	place?: {
		city: LanguageValue[];
		country: string;
		shortId: string;
	};
	remark?: LanguageValue[];
	// -----------
	fermentation?: Fermentation[];
	styleTags?: {
		badge: string;
		name: LanguageValue[];
	}[];
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
	rateBeer?: number;
	untappd?: string;
	// -----------
	price?: {
		currency: Currency;
		date: Date;
		shop?: string;
		value: number;
	}[];
	notes?: string;
};
