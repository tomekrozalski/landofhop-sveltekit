import { ingredientsStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

export function onSubmit(close: () => void) {
	return async function (values: any) {
		//@ToDo change type
		const formattedValues = formatValues(values);

		const updatedIngredients = await postJsonData({
			path: '/api/admin/ingredients',
			data: formattedValues
		});

		ingredientsStore.set(updatedIngredients);
		close();
	};
}
