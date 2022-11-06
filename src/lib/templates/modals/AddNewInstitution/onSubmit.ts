import { institutionStore } from '$lib/utils/stores/selects';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const response = await fetch('/api/admin/institutions', {
			method: 'POST',
			body: JSON.stringify(formattedValues)
		});
		const updatedInstitutions = await response.json();

		institutionStore.set(updatedInstitutions);
		close();
	};
}
