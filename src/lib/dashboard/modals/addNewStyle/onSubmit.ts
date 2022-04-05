import { styleStore } from '$lib/dashboard/utils/stores';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await apiCall(fetch, Endpoints.addStyle, {
			method: 'PUT',
			body: JSON.stringify(formattedValues)
		});

		styleStore.set(updatedStyles);
		close();
	};
}
