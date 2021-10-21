import { producerStore, page } from '$lib/dashboard/utils/stores';

export function onSubmit(values) {
	producerStore.set(values);
	page.set('editorial');
}
