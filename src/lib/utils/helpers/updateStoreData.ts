import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import { ingredientsStore, institutionStore, styleStore } from '$lib/utils/stores/selects';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
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

async function updateInstitutionList() {
	if (get(institutionStore).length === 0) {
		const institutions: InstitutionType[] = await apiCall(fetch, Endpoints.institutions);
		institutionStore.set(institutions);
	}
}

export { updateIngredientList, updateInstitutionList, updateStyleList };
