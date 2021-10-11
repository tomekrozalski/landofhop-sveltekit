import { page } from '$lib/dashboard/utils/stores';

export function onSubmit(values) {
	console.log({ values });
	page.set('editorial');
}
