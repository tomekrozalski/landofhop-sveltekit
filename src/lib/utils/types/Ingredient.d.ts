import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';

export type IngredientRaw = {
	badge: string;
	name: LanguageValue;
	type: IngredientType;
	parent?: string;
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
};

export type IngredientTree = {
	badge: string;
	name: LanguageValue;
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	hasSuccessors?: boolean;
	successors?: IngredientTree[];
};

export type Ingredient = IngredientRaw & { _id: string };
