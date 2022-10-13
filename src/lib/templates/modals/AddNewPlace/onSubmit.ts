import { placeStore } from '$lib/utils/stores/selects';
import { postJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const updatedPlaces = await postJsonData({
			path: '/api/admin/places',
			data: formattedValues
		});

		placeStore.set(updatedPlaces);
		close();
	};
}
