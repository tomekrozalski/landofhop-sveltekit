import { writable } from 'svelte/store';
import type { LabelFormValues } from './Label/LabelFormValues';
import type { ProducerFormValues } from './Producer/ProducerFormValues';
import type { EditorialFormValues } from './Editorial/EditorialFormValues';
import { initialValues as initialLabelValues } from './Label/initialValues';
import { initialValues as initialProducerValues } from './Producer/initialValues';
import { initialValues as initialEditorialValues } from './Editorial/initialValues';

export const editorialStore = writable<EditorialFormValues>(initialEditorialValues);
export const labelStore = writable<LabelFormValues>(initialLabelValues);
export const page = writable<'label' | 'producer' | 'editorial'>('label');
export const producerStore = writable<ProducerFormValues>(initialProducerValues);
