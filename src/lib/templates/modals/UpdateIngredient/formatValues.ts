import type { IngredientRaw } from '$lib/utils/types/Ingredient';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
import { formatLanguageValueArray } from '$lib/utils/helpers/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	occurrences: { alone: number; withSuccessors: number };
	parent: string;
	type: IngredientType;
};

export default function formatValues({
	badge,
	name,
	occurrences,
	parent,
	type
}: Input): IngredientRaw {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		occurrences,
		parent,
		type
	};
}
