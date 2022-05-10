<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { LabelFormValues } from '$lib/dashboard/beverage/label/LabelFormValues';
	import type { ProducerFormValues } from '$lib/dashboard/beverage/producer/ProducerFormValues';
	import type { EditorialFormValues } from '$lib/dashboard/beverage/editorial/EditorialFormValues';

	type DetailsAdmin = {
		label: LabelFormValues;
		producer: ProducerFormValues;
		editorial: EditorialFormValues;
	};

	export async function load({ fetch, params }) {
		try {
			const beverage: DetailsAdmin = await apiCall(fetch, Endpoints.beverageDetailsAdmin, {
				pathParams: [params.shortId]
			});

			return { props: { beverage } };
		} catch (err) {
			return {
				props: { beverage: null }
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
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dashboardDictionary);
	translations.update(commonFormsDictionary);

	export let beverage: DetailsAdmin | null;

	if (!beverage) {
		$session.isLoggedIn = false;
	}

	if (beverage) {
		labelStore.set(beverage.label);
		producerStore.set(beverage.producer);
		editorialStore.set(beverage.editorial);
	}

	setContext('formType', 'update');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeverage')}</title>
</svelte:head>

<Beverage />
