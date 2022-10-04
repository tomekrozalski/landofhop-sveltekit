import type { IngredientRaw } from '$lib/utils/types/Ingredient';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
import { formatLanguageValueArray } from '$lib/utils/admin/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	type: IngredientType;
	parent: string;
};

export default function formatValues({ badge, name, type, parent }: Input): IngredientRaw {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		type,
		parent,
		occurrences: {
			alone: 0,
			withSuccessors: 0
		}
	};
}
