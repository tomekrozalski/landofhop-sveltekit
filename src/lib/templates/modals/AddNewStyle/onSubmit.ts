import { styleStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

// @ToDo types
export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await postJsonData({
			path: '/api/admin/styles',
			data: formattedValues
		});

		styleStore.set(updatedStyles);
		close();
	};
}
