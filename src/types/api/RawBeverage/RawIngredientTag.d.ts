import type { LanguageValue } from '$types/common/LanguageValue';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';

export type RawIngredientTag = {
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
};
