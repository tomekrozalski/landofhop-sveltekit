import { get } from 'svelte/store';
import { isEmpty } from 'lodash-es';
import { goto } from '$app/navigation';
import formatLabelValues from '$Beverage/Label/formatValues';
import formatProducerValues from '$Beverage/Producer/formatValues';
import { editorialStore, labelStore, producerStore } from '$Beverage/utils/stores';
import formatEditorialValues from './formatValues';
import type { EditorialFormValues } from './EditorialFormValues.d';

export function onSubmit(
	type: 'add' | 'update',
	params: { badge: string; brand: string; shortId: string }
) {
	return async function (values: EditorialFormValues) {
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
			const response = await fetch('/dashboard/api/add-new-beverage', {
				method: 'POST',
				body: JSON.stringify(completeData)
			});
			const { badge, brand, shortId } = await response.json();

			goto(`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}`);
		}

		if (type === 'update') {
			const { shortId, brand, badge } = params;

			await fetch(`/dashboard/api/update-basics/${shortId}`, {
				method: 'PUT',
				body: JSON.stringify(completeData)
			});

			await fetch(`/dashboard/api/update-beverage/${shortId}`, {
				method: 'PUT',
				body: JSON.stringify(completeData)
			});

			goto(`/details/${shortId}/${brand}/${badge}`);
		}
	};
}
