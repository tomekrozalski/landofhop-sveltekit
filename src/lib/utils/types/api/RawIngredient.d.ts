import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type RawIngredientWithoutId = {
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
	parent?: string; // required except: water, malt, hop, yeast, addition
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	successorsList?: string[];
};

export type RawIngredient = RawIngredientWithoutId & {
	_id: string;
};
