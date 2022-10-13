import formatLanguageValueArray from '$lib/utils/normalizers/language';
import type { IngredientType } from '$types/enums/Beverage.enum';
import type { Input, Output } from './types.d';

export default function formatValues({ badge, name, type, parent }: Input): Output {
	return {
		badge: badge.trim(),
		name: formatLanguageValueArray(name),
		occurrences: {
			alone: 0,
			withSuccessors: 0
		},
		parent,
		type: type as IngredientType
	};
}
