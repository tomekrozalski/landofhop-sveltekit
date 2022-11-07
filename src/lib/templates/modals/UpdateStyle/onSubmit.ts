import { invalidate } from '$app/navigation';
import { styleStore } from '$lib/utils/stores/selects';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void, badge: string) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const response = await fetch(`/api/admin/styles/${badge}`, {
			method: 'PUT',
			body: JSON.stringify(formattedValues)
		});
		const updatedStyles = await response.json();

		styleStore.set(updatedStyles);

		await invalidate('/api/stats/styles/pl');

		close();
	};
}
