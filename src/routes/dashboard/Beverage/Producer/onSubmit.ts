import { producerStore, page } from '../../utils/stores';

export function onSubmit(values) {
	producerStore.set(values);
	page.set('editorial');
}
