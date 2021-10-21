import { labelStore, page } from '$lib/dashboard/utils/stores';

export function onSubmit(values) {
	labelStore.set(values);
	page.set('producer');
}
