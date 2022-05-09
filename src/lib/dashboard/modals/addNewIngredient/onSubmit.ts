import { ingredientsStore } from '$lib/utils/stores/selects';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedIngredients = await apiCall(fetch, Endpoints.addIngredient, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		ingredientsStore.set(updatedIngredients);
		close();
	};
}
