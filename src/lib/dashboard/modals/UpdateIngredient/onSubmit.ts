import { invalidate } from '$app/navigation';

import { ingredientsStore } from '$lib/utils/stores/selects';
import apiCall, { Endpoints, getLink } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(initial, close, type) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedIngredients = await apiCall(fetch, Endpoints.updateIngredient, {
			method: 'PUT',
			body: JSON.stringify({ ...formattedValues, initial })
		});

		ingredientsStore.set(updatedIngredients);

		await invalidate(getLink(Endpoints.statsIngredients, ['pl', type]));

		close();
	};
}
