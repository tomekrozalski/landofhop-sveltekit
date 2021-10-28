import type { InstitutionInsideBeverage } from '$lib/utils/types/Institution';
import type { Price } from '$lib/utils/types/Beverage/fragments/Price';
import { Fermentation } from '$lib/utils/enums/Beverage.enum';

export type EditorialFormValues = {
	cooperation: string[] | null;
	contract: string | null;
	// -----------
	fermentation: Fermentation[] | null;
	style: LanguageValue[];
	alcoholScope: AlcoholScope | null;
	filtration: boolean | null;
	pasteurization: boolean | null;
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
	// -----------
	fermentation?: Fermentation[];
	style?: LanguageValue[];
	alcoholScope?: AlcoholScope;
	filtration?: boolean;
	pasteurization?: boolean;
	// -----------
	price?: Price[];
	notes?: string;
};
