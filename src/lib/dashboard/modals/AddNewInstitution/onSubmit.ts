import { institutionStore } from '$lib/utils/stores/selects';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedInstitutions = await apiCall(fetch, Endpoints.addInstitution, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		institutionStore.set(updatedInstitutions);
		close();
	};
}
