import { statsStyle, styleStore } from '$lib/dashboard/utils/stores';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close, badge) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedStyles = await apiCall(fetch, Endpoints.updateStyle, {
			method: 'PUT',
			body: JSON.stringify(formattedValues),
			pathParams: [badge]
		});

		const updatedStatsData = await apiCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] });

		statsStyle.set(updatedStatsData);
		styleStore.set(updatedStyles);
		close();
	};
}
