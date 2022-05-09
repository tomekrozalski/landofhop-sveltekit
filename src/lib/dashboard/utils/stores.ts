import { writable } from 'svelte/store';
import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
import type { LabelFormValues } from '$lib/dashboard/beverage/label/LabelFormValues';
import type { ProducerFormValues } from '$lib/dashboard/beverage/producer/ProducerFormValues';
import type { EditorialFormValues } from '$lib/dashboard/beverage/editorial/EditorialFormValues';
import { initialValues as initialLabelValues } from '$lib/dashboard/beverage/label/initialValues';
import { initialValues as initialProducerValues } from '$lib/dashboard/beverage/producer/initialValues';
import { initialValues as initialEditorialValues } from '$lib/dashboard/beverage/editorial/initialValues';

export const beveragePhotosStore = writable<PhotosDataTypes | null>(null);
export const editorialStore = writable<EditorialFormValues>(initialEditorialValues);
export const labelStore = writable<LabelFormValues>(initialLabelValues);
export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const producerStore = writable<ProducerFormValues>(initialProducerValues);
