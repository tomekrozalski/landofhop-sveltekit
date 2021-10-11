import { labelStore, page } from '$lib/dashboard/utils/stores';
import formatValues from './formatValues';

export function onSubmit(values) {
	const formattedValues = formatValues(values);

	labelStore.set(formattedValues);
	page.set('producer');
}
