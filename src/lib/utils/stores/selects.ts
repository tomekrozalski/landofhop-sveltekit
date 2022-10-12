import { writable } from 'svelte/store';
import type { Ingredient as IngredientType } from './types/Ingredient.d'; // @ToDo: are these types valid?
import type { Institution as InstitutionType } from './types/Institution.d'; // @ToDo: are these types valid?
import type { Place as PlaceType } from './types/Place.d'; // @ToDo: are these types valid?
import type { Style as StyleType } from './types/Style.d'; // @ToDo: are these types valid?

export const ingredientsStore = writable<IngredientType[]>([]);
export const institutionStore = writable<InstitutionType[]>([]);
export const placeStore = writable<PlaceType[]>([]);
export const styleStore = writable<StyleType[]>([]);
