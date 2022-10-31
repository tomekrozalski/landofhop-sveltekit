import { writable } from 'svelte/store';
import type { PhotosDataTypes } from './types.d';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
