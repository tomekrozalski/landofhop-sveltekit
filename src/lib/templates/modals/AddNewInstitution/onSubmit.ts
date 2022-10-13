import { institutionStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const updatedInstitutions = await postJsonData({
			path: '/api/admin/institutions',
			data: formattedValues
		});

		institutionStore.set(updatedInstitutions);
		close();
	};
}
