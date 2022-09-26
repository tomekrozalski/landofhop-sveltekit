import { labelStore, page } from '../../utils/stores';

export function onSubmit(values) {
	labelStore.set(values);
	page.set('producer');
}
