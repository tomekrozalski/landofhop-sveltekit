import { writable } from 'svelte/store';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';

export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const institutionStore = writable<InstitutionType[]>([]);
