import type { LanguageValue } from '$types/common/LanguageValue';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';

export type IngredientRaw = {
	badge: string;
	name: LanguageValue[];
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	parent?: string;
	type: IngredientType;
};

export type IngredientTree = {
	badge: string;
	name: LanguageValue;
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	successors?: IngredientTree[];
	successorsList?: string[];
};

export type Ingredient = IngredientRaw & { _id: string };
