import { invalidate } from '$app/navigation';
import { styleStore } from '$lib/utils/stores/selects';
import { putJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';
import type { Input } from './types.d';

export function onSubmit(close: () => void, badge: string) {
	return async function (values: Input) {
		const formattedValues = formatValues(values);

		const updatedStyles = await putJsonData({
			path: `/api/admin/styles/${badge}`,
			data: formattedValues
		});

		styleStore.set(updatedStyles);

		await invalidate('/api/stats/styles/pl');

		close();
	};
}
