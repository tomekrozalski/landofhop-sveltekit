import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';

export type Ingredient = {
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
	parent?: string;
};
