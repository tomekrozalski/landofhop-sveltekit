import { writable } from 'svelte/store';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';

export const institutionStore = writable<InstitutionType[]>([]);
