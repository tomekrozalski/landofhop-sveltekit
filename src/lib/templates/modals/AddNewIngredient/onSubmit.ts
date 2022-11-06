import { ingredientsStore } from '$lib/utils/stores/selects';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const response = await fetch('/api/admin/ingredients', {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});
		const updatedIngredients = await response.json();

		ingredientsStore.set(updatedIngredients);
		close();
	};
}
