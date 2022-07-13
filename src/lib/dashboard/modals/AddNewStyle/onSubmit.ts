import { styleStore } from '$lib/utils/stores/selects';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await apiCall(fetch, Endpoints.addStyle, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		styleStore.set(updatedStyles);
		close();
	};
}
