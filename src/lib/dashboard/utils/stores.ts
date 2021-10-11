import { writable } from 'svelte/store';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';

export const institutionStore = writable<InstitutionType[]>([]);
export const labelStore = writable();
export const page = writable<'label' | 'producer' | 'editorial'>('label');
