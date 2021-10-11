import { institutionStore } from '$lib/dashboard/utils/stores';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedInstitutions = await serverCall(fetch, Endpoints.addInstitution, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		institutionStore.set(updatedInstitutions);
		close();
	};
}
