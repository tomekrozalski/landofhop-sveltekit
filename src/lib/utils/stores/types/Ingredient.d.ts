import type { IngredientType } from '$types/enums/Beverage.enum';
import type { LanguageValue } from '$types/LanguageValue.d';

export type Ingredient = {
	_id: string;
	badge: string;
	name: LanguageValue[];
	occurrences: {
		alone: number;
		withSuccessors: number;
	};
	parent?: string;
	type: IngredientType;
};
