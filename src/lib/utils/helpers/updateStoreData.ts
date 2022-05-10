import { get } from 'svelte/store';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import {
	ingredientsStore,
	institutionStore,
	placeStore,
	styleStore
} from '$lib/utils/stores/selects';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
import type { Place as PlaceType } from '$lib/utils/types/Place';
import type { Style as StyleType } from '$lib/utils/types/Style';

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

async function updatePlaceList() {
	if (get(placeStore).length === 0) {
		const places: PlaceType[] = await apiCall(fetch, Endpoints.places);
		placeStore.set(places);
	}
}

async function updateStyleList() {
	if (get(styleStore).length === 0) {
		const styles: StyleType[] = await apiCall(fetch, Endpoints.styles);
		styleStore.set(styles);
	}
}

export { updateIngredientList, updateInstitutionList, updatePlaceList, updateStyleList };
