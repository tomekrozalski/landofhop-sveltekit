import { invalidateAll } from '$app/navigation';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void, shortId: string) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		await fetch(`/api/admin/modals/update-place/${shortId}/update`, {
			method: 'PUT',
			body: JSON.stringify(formattedValues)
		});

		await invalidateAll();
		close();
	};
}
