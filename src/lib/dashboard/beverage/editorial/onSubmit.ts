import { get } from 'svelte/store';
import { isEmpty } from 'lodash-es';

import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import { editorialStore, labelStore, producerStore } from '$lib/dashboard/utils/stores';
import formatLabelValues from '$lib/dashboard/beverage/label/formatValues';
import formatProducerValues from '$lib/dashboard/beverage/producer/formatValues';
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
			const { badge, brand, shortId } = await serverCall(fetch, Endpoints.addBeverage, {
				method: 'POST',
				body: JSON.stringify(completeData)
			});

			goto(`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}`);
		}

		if (type === 'update') {
			const { shortId, brand, badge } = params;

			await serverCall(fetch, Endpoints.updateBeverage, {
				method: 'PUT',
				body: JSON.stringify(completeData),
				pathParams: [shortId]
			});

			goto(`/details/${shortId}/${brand}/${badge}`);
		}
	};
}
