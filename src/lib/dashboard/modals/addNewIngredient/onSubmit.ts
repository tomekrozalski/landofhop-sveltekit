import { ingredientsStore } from '$lib/dashboard/utils/stores';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedIngredients = await serverCall(fetch, Endpoints.addIngredient, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		ingredientsStore.set(updatedIngredients);
		close();
	};
}
