import { invalidate } from '$app/navigation';

import { styleStore } from '$lib/utils/stores/selects';
import { putJsonData } from '$lib/utils/api/communication';
import formatValues from './formatValues';

export function onSubmit(close, badge) {
	return async function (values) {
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
