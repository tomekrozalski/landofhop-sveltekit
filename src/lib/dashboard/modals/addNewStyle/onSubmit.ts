import { styleStore } from '$lib/dashboard/utils/stores';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await serverCall(fetch, Endpoints.addStyle, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		styleStore.set(updatedStyles);
		close();
	};
}
