import { styleStore } from '$lib/dashboard/utils/stores';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import formatValues from './formatValues';

export function onSubmit(close, badge) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await serverCall(fetch, Endpoints.updateStyle, {
			method: 'PUT',
			body: JSON.stringify(formattedValues),
			pathParams: [badge]
		});

		styleStore.set(updatedStyles);
		close();
	};
}
