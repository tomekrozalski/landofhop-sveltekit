import type { Ingredient } from '$lib/utils/types/Ingredient';
import type { IngredientType } from '$lib/utils/enums/Beverage.enum';
import { formatLanguageValueArray } from '$lib/dashboard/utils/dataNormalizers';

type Input = {
	badge: string;
	name: {
		value: string;
		language: string;
	}[];
	type: IngredientType;
	parent: string | null;
};

export default function formatValues({ badge, name, type, parent }: Input): Ingredient {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		type,
		...(parent && { parent })
	};
}
