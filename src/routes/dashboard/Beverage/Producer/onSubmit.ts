import { producerStore, page } from '../stores';

export function onSubmit(values) {
	producerStore.set(values);
	page.set('editorial');
}
