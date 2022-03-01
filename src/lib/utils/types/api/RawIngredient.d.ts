import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
import type { LanguageValue } from '$lib/utils/types/common/LanguageValue';

export type RawIngredientWithoutId = {
	_id: string;
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
	parent?: string;
};

export type RawIngredient = RawIngredientWithoutId & {
	_id: string;
};
