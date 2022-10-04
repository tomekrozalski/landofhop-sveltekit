import { placeStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

export function onSubmit(close) {
	return async function (values) {
		const formattedValues = formatValues(values);

		const updatedPlaces = await postJsonData({
			path: '/api/admin/places',
			data: formattedValues
		});

		placeStore.set(updatedPlaces);
		close();
	};
}
