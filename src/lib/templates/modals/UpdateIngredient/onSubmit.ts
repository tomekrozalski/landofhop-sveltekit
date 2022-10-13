import { invalidate } from '$app/navigation';
import { ingredientsStore } from '$lib/utils/stores/selects';
import { putJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(initial: string, close: () => void, type: string) {
	return async function (values: Input) {
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
