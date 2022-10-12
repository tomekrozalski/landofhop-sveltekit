import { get } from 'svelte/store';
import { getJsonData } from '$lib/utils/api/communication';
import {
	ingredientsStore,
	institutionStore,
	placeStore,
	styleStore
} from '$lib/utils/stores/selects';
import type { Ingredient as IngredientType } from '$lib/utils/stores/types/Ingredient.d';
import type { Institution as InstitutionType } from '$lib/utils/stores/types/Institution.d';
import type { Place as PlaceType } from '$lib/utils/stores/types/Place.d';
import type { Style as StyleType } from '$lib/utils/stores/types/Style.d';

async function updateIngredientList() {
	if (get(ingredientsStore).length === 0) {
		const ingredients: IngredientType[] = await getJsonData({ path: '/api/ingredients' });

		ingredientsStore.set(ingredients);
	}
}

async function updateInstitutionList() {
	if (get(institutionStore).length === 0) {
		const institutions: InstitutionType[] = await getJsonData({ path: '/api/institutions' });

		institutionStore.set(institutions);
	}
}

async function updatePlaceList() {
	if (get(placeStore).length === 0) {
		const places: PlaceType[] = await getJsonData({ path: '/api/places' });
		placeStore.set(places);
	}
}

async function updateStyleList() {
	if (get(styleStore).length === 0) {
		const styles: StyleType[] = await getJsonData({ path: '/api/styles' });
		styleStore.set(styles);
	}
}

export { updateIngredientList, updateInstitutionList, updatePlaceList, updateStyleList };
