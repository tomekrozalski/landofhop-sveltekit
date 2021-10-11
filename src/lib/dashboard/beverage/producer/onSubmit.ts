import { producerStore, page } from '$lib/dashboard/utils/stores';
import formatValues from './formatValues';

export function onSubmit(values) {
	const formattedValues = formatValues(values);

	producerStore.set(formattedValues);
	page.set('editorial');
}
