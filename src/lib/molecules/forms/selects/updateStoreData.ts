import { get } from 'svelte/store';
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
		const response = await fetch('/api/ingredients');
		const ingredients: IngredientType[] = await response.json();

		ingredientsStore.set(ingredients);
	}
}

async function updateInstitutionList() {
	if (get(institutionStore).length === 0) {
		const response = await fetch('/api/institutions');
		const institutions: InstitutionType[] = await response.json();

		institutionStore.set(institutions);
	}
}

async function updatePlaceList() {
	if (get(placeStore).length === 0) {
		const response = await fetch('/api/places');
		const places: PlaceType[] = await response.json();
		placeStore.set(places);
	}
}

async function updateStyleList() {
	if (get(styleStore).length === 0) {
		const response = await fetch('/api/styles');
		const styles: StyleType[] = await response.json();
		styleStore.set(styles);
	}
}

export { updateIngredientList, updateInstitutionList, updatePlaceList, updateStyleList };
