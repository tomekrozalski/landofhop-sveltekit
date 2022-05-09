import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import { ingredientsStore, styleStore } from '$lib/utils/stores/selects';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
import type { Style as StyleType } from '$lib/utils/types/Style';

async function updateStyleList() {
	if (get(styleStore).length === 0) {
		const styles: StyleType[] = await apiCall(fetch, Endpoints.styles);
		styleStore.set(styles);
	}
}

async function updateIngredientList() {
	if (get(ingredientsStore).length === 0) {
		const ingredients: IngredientType[] = await apiCall(fetch, Endpoints.ingredients);
		ingredientsStore.set(ingredients);
	}
}

export { updateIngredientList, updateStyleList };
