import { writable } from 'svelte/store';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
