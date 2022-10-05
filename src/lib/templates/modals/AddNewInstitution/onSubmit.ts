import { institutionStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

// @ToDo types
export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedInstitutions = await postJsonData({
			path: '/api/admin/institutions',
			data: formattedValues
		});

		institutionStore.set(updatedInstitutions);
		close();
	};
}
