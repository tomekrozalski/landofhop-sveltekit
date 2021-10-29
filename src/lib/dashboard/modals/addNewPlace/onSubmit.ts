import { placeStore } from '$lib/dashboard/utils/stores';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedPlaces = await serverCall(fetch, Endpoints.addPlace, {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});

		placeStore.set(updatedPlaces);
		close();
	};
}
