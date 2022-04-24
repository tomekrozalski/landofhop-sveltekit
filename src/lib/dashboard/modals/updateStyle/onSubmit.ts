import { invalidate } from '$app/navigation';

import { styleStore } from '$lib/dashboard/utils/stores';
import apiCall, { Endpoints, getLink } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close, badge) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await apiCall(fetch, Endpoints.updateStyle, {
			method: 'PUT',
			body: JSON.stringify(formattedValues),
			pathParams: [badge]
		});

		styleStore.set(updatedStyles);

		await invalidate(getLink(Endpoints.statsStyles, ['pl']));

		close();
	};
}
