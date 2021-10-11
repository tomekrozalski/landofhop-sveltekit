import { get } from 'svelte/store';
import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
import { editorialStore, labelStore, producerStore } from '$lib/dashboard/utils/stores';
import formatValues from './formatValues';

export async function onSubmit(values) {
	const formattedValues = formatValues(values);

	editorialStore.set(formattedValues);

	const completeData = {
		label: get(labelStore),
		producer: get(producerStore),
		editorial: formattedValues
	};

	await serverCall(fetch, Endpoints.addBeverage, {
		method: 'POST',
		body: JSON.stringify(completeData)
	});

	console.log({ completeData });
	// go to
}
