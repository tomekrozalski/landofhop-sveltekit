import { producerStore, page } from '$Beverage/utils/stores';
import type { ProducerFormValues } from './ProducerFormValues.d';

export function onSubmit(values: ProducerFormValues) {
	producerStore.set(values);
	page.set('editorial');
}
