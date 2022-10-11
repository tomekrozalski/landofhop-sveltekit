import type { LanguageValue } from '$types/common/LanguageValue';
import {
	AlcoholRelate,
	AlcoholScope,
	AlcoholUnit,
	ExpirationDateUnit,
	ExtractRelate,
	ExtractUnit,
	Fermentation,
	HopRateUnit
} from '$lib/utils/enums/Beverage.enum';
import { RawAged } from './RawAged';
import { RawIngredientTag } from './RawIngredientTag';

export type RawBrewing = {
	fermentation?: Fermentation[];
	extract?: {
		relate: ExtractRelate;
		unit: ExtractUnit;
		value: number;
	};
	alcohol?: {
		relate: AlcoholRelate;
		unit: AlcoholUnit;
		value: number;
		scope?: AlcoholScope;
	};
	filtration?: boolean;
	pasteurization?: boolean;
	aged?: RawAged[];
	style?: LanguageValue[];
	isDryHopped?: boolean;
	dryHopped?: RawIngredientTag[];
	hopRate?: {
		unit: HopRateUnit;
		value: number;
	};
	nitrogen?: boolean;
	expirationDate?: {
		value: number;
		unit: ExpirationDateUnit;
	};
};
