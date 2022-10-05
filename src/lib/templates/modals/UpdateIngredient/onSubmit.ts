import { invalidate } from '$app/navigation';
import { ingredientsStore } from '$lib/utils/stores/selects';
import { putJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

// @ToDo types
export function onSubmit(initial, close, type) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedIngredients = await putJsonData({
			path: '/api/admin/ingredients',
			data: { ...formattedValues, initial }
		});

		ingredientsStore.set(updatedIngredients);

		await invalidate(`/api/stats/ingredients/pl/${type}`);

		close();
	};
}
