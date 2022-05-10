<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Place as PlaceType } from '$lib/utils/types/Place';

	export async function load({ fetch }) {
		try {
			const [places]: [PlaceType[]] = await Promise.all([apiCall(fetch, Endpoints.places)]);

			return { props: { forbidden: false, places } };
		} catch (err) {
			return {
				props: {
					forbidden: err.message === 'Unauthorized',
					places: []
				}
			};
		}
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { translate, translations } from 'svelte-intl';
	import { session } from '$app/stores';
	import dashboardDictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';
	import { editorialStore, labelStore, producerStore } from '$lib/dashboard/utils/stores';
	import { placeStore } from '$lib/utils/stores/selects';
	import { initialValues as initialLabelValues } from '$lib/dashboard/beverage/label/initialValues';
	import { initialValues as initialProducerValues } from '$lib/dashboard/beverage/producer/initialValues';
	import { initialValues as initialEditorialValues } from '$lib/dashboard/beverage/editorial/initialValues';
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dashboardDictionary);
	translations.update(commonFormsDictionary);

	export let forbidden: boolean;
	export let places: PlaceType[];

	if (forbidden) {
		$session.isLoggedIn = false;
	}

	placeStore.set(places);
	labelStore.set(initialLabelValues);
	producerStore.set(initialProducerValues);
	editorialStore.set(initialEditorialValues);

	setContext('formType', 'add');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.addNewBeverage')}</title>
</svelte:head>

<Beverage />
