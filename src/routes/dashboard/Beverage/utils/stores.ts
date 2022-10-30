import { writable } from 'svelte/store';
import type { LabelFormValues } from '$Beverage/Label/LabelFormValues';
import type { ProducerFormValues } from '$Beverage/Producer/ProducerFormValues';
import type { EditorialFormValues } from '$Beverage/Editorial/EditorialFormValues';
import { initialValues as initialLabelValues } from '$Beverage/Label/initialValues';
import { initialValues as initialProducerValues } from '$Beverage/Producer/initialValues';
import { initialValues as initialEditorialValues } from '$Beverage/Editorial/initialValues';

export const editorialStore = writable<EditorialFormValues>(initialEditorialValues);
export const labelStore = writable<LabelFormValues>(initialLabelValues);
export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const producerStore = writable<ProducerFormValues>(initialProducerValues);
