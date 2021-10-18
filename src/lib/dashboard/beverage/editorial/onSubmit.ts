import { get } from 'svelte/store';
import isEmpty from 'lodash/isEmpty.js';

import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import { editorialStore, labelStore, producerStore } from '$lib/dashboard/utils/stores';
import formatValues from './formatValues';
import { goto } from '$app/navigation';

export async function onSubmit(values) {
	const formattedValues = formatValues(values);

	editorialStore.set(formattedValues);
	const labelValues = get(labelStore);
	const producerValues = get(producerStore);

	const completeData = {
		label: labelValues,
		...(!isEmpty(producerValues) && { producer: producerValues }),
		...(!isEmpty(formattedValues) && { editorial: formattedValues })
	};

	const { badge, brand, shortId } = await serverCall(fetch, Endpoints.addBeverage, {
		method: 'POST',
		body: JSON.stringify(completeData)
	});

	goto(`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}`);
}
