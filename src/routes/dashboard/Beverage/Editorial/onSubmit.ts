import { get } from 'svelte/store';
import { isEmpty } from 'lodash-es';

import { postJsonData, putJsonData } from '$lib/utils/api/communication';
import formatLabelValues from '../../Beverage/Label/formatValues';
import formatProducerValues from '../../Beverage/Producer/formatValues';
import { editorialStore, labelStore, producerStore } from '../stores';
import formatEditorialValues from './formatValues';
import { goto } from '$app/navigation';

export function onSubmit(
	type: 'add' | 'update',
	params: { badge: string; brand: string; shortId: string }
) {
	return async function (values) {
		editorialStore.set(values);
		const labelValues = get(labelStore);
		const producerValues = get(producerStore);

		const formattedLabelValues = formatLabelValues(labelValues);
		const formattedProducerValues = formatProducerValues(producerValues);
		const formattedEditorialValues = formatEditorialValues(values);

		const completeData = {
			label: formattedLabelValues,
			...(!isEmpty(formattedProducerValues) && { producer: formattedProducerValues }),
			...(!isEmpty(formattedEditorialValues) && { editorial: formattedEditorialValues })
		};

		if (type === 'add') {
			const { badge, brand, shortId } = await postJsonData({
				path: '/api/admin/beverages/add',
				data: completeData
			});

			goto(`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}`);
		}

		if (type === 'update') {
			const { shortId, brand, badge } = params;

			await putJsonData({
				path: `/api/admin/basics/update/${shortId}`,
				data: completeData
			});

			await putJsonData({
				path: `/api/admin/beverages/update/${shortId}`,
				data: completeData
			});

			goto(`/details/${shortId}/${brand}/${badge}`);
		}
	};
}
