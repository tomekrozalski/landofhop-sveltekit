import { placeStore } from '$lib/dashboard/utils/stores';
import apiCall, { Endpoints } from '$lib/utils/api/call';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedPlaces = await apiCall(fetch, Endpoints.addPlace, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		placeStore.set(updatedPlaces);
		close();
	};
}
