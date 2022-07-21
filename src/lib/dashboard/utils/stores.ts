import { writable } from 'svelte/store';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
import type { LabelFormValues } from '$lib/dashboard/Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/Beverage/Editorial/EditorialFormValues';
import { initialValues as initialLabelValues } from '$lib/dashboard/Beverage/Label/initialValues';
import { initialValues as initialProducerValues } from '$lib/dashboard/Beverage/Producer/initialValues';
import { initialValues as initialEditorialValues } from '$lib/dashboard/Beverage/Editorial/initialValues';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
export const editorialStore = writable<EditorialFormValues>(initialEditorialValues);
export const labelStore = writable<LabelFormValues>(initialLabelValues);
export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const producerStore = writable<ProducerFormValues>(initialProducerValues);
