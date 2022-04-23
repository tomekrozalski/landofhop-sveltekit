import { invalidate } from '$app/navigation';

import { ingredientsStore } from '$lib/dashboard/utils/stores';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(initial, close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedIngredients = await apiCall(fetch, Endpoints.updateIngredient, {
			method: 'PUT',
			body: JSON.stringify({ ...formattedValues, initial })
		});

		ingredientsStore.set(updatedIngredients);

		await invalidate('/api/stats/ingredients/pl/addition');

		close();
	};
}
