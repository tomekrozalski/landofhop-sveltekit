import { labelStore, page } from '../stores';

export function onSubmit(values) {
	labelStore.set(values);
	page.set('producer');
}
