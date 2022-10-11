import { writable } from 'svelte/store';
import type { Ingredient as IngredientType } from '$types/Ingredient';
import type { Institution as InstitutionType } from '$types/Institution';
import type { Place as PlaceType } from '$types/Place';
import type { Style as StyleType } from '$types/Style';

export const ingredientsStore = writable<IngredientType[]>([]);
export const institutionStore = writable<InstitutionType[]>([]);
export const placeStore = writable<PlaceType[]>([]);
export const styleStore = writable<StyleType[]>([]);
