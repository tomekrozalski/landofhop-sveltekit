import { placeStore } from '$lib/utils/stores/selects';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const response = await fetch('/api/admin/modals/add-new-place', {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});
		const updatedPlaces = await response.json();

		placeStore.set(updatedPlaces);
		close();
	};
}
