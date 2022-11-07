import { invalidate } from '$app/navigation';
import { ingredientsStore } from '$lib/utils/stores/selects';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(initial: string, close: () => void, type: string) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const response = await fetch('/api/admin/ingredients', {
			method: 'PUT',
			body: JSON.stringify({ ...formattedValues, initial })
		});
		const updatedIngredients = await response.json();

		ingredientsStore.set(updatedIngredients);

		await invalidate(`/api/stats/ingredients/pl/${type}`);

		close();
	};
}
