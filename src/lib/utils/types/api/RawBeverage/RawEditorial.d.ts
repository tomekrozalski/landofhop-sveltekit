import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import { AlcoholScope, Clarity, Fermentation } from '$lib/utils/enums/Beverage.enum';
import { RawAged } from './RawAged';
import { RawIngredientTag } from './RawIngredientTag';
import { RawInstitution } from './RawInstitution.d.ts';
import { RawPlace } from './RawPlace.d.ts';
import { RawPrice } from './RawPrice.d.ts';

export type RawEditorialGeneral = {
	series?: LanguageValue[];
	cooperation?: RawInstitution[];
	contract?: RawInstitution;
	isContract?: boolean;
	place?: RawPlace;
	remark?: LanguageValue[];
};

export type RawStyleTag = {
	badge: string;
	name: LanguageValue[];
};

export type RawEditorialBrewing = {
	fermentation?: Fermentation[];
	styleTags?: RawStyleTag[];
	alcohol?: {
		scope: AlcoholScope;
	};
	filtration?: boolean;
	pasteurization?: boolean;
	aged?: RawAged[];
	isDryHopped?: boolean;
	dryHopped?: RawIngredientTag[];
	nitrogen?: boolean;
};

export type RawEditorialImpressions = {
	color?: string;
	clarity?: Clarity;
};

export type RawEditorialPhotos = {
	cap?: boolean;
	cover?: {
		height: number;
		width: number;
	};
	gallery?: number;
	outlines?: {
		cover?: string;
		gallery?: string;
	};
	viewFromAbove?: boolean;
};

export type RawEditorial = {
	general?: RawEditorialGeneral;
	brewing?: RawEditorialBrewing;
	impressions?: RawEditorialImpressions;
	price?: RawPrice[];
	photos?: RawEditorialPhotos;
	notes?: string;
};
