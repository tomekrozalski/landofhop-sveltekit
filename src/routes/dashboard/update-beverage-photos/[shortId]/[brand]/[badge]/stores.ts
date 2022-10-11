import { writable } from 'svelte/store';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$types/Beverage/PhotosData';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
