import { writable } from 'svelte/store';
import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
import type { Place as PlaceType } from '$lib/utils/types/Place';
import type { Style as StyleType } from '$lib/utils/types/Style';

export const ingredientsStore = writable<IngredientType[]>([]);
export const institutionStore = writable<InstitutionType[]>([]);
export const placeStore = writable<PlaceType[]>([]);
export const styleStore = writable<StyleType[]>([]);
