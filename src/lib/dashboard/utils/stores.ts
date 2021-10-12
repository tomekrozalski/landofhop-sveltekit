import { writable } from 'svelte/store';
import type { PhotosData as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
import type { LabelFormOutput } from '$lib/dashboard/beverage/label/LabelFormValues';
import type { ProducerFormOutput } from '$lib/dashboard/beverage/producer/ProducerFormValues';
import type { EditorialFormOutput } from '$lib/dashboard/beverage/editorial/EditorialFormValues';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
export const editorialStore = writable<EditorialFormOutput | null>(null);
export const institutionStore = writable<InstitutionType[]>([]);
export const labelStore = writable<LabelFormOutput | null>(null);
export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const producerStore = writable<ProducerFormOutput | null>(null);
