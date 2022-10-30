import type { IngredientType } from './enums/Beverage.enum';
import type { LanguageValue } from './LanguageValue.d';

export type RawIngredient = {
	// _id: string;
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
	parent?: string;
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	successorsList?: string[];
};
