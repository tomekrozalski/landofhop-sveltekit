import { labelStore, page } from '$Beverage/utils/stores';
import type { LabelFormValues } from './LabelFormValues.d';

export function onSubmit(values: LabelFormValues) {
	labelStore.set(values);
	page.set('producer');
}
