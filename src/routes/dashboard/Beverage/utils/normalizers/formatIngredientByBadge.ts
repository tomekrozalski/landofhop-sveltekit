import { get } from 'svelte/store';
import { ingredientsStore } from '$lib/utils/stores/selects';
import type { LanguageValue } from '$types/LanguageValue.d';
import type { IngredientType } from '$types/enums/Beverage.enum';
import type { Ingredient } from '$lib/utils/stores/types/Ingredient.d';

type Output = {
	badge: string;
	name: LanguageValue[];
	type: IngredientType;
};

export const formatIngredientByBadge = (value: string): Output => {
	const { badge, name, type } = get(ingredientsStore).find(
		({ badge }) => badge === value
	) as Ingredient;

	return { badge, name, type };
};
