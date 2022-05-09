<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
	import type { Place as PlaceType } from '$lib/utils/types/Place';
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
			const [beverage, institutions, places]: [
				DetailsAdmin,
				InstitutionType[],
				PlaceType[]
			] = await Promise.all([
				apiCall(fetch, Endpoints.beverageDetailsAdmin, {
					pathParams: [params.shortId]
				}),
				apiCall(fetch, Endpoints.institutions),
				apiCall(fetch, Endpoints.places)
			]);

			return { props: { beverage, forbidden: false, institutions, places } };
		} catch (err) {
			return {
				props: {
					beverage: null,
					forbidden: err.message === 'Unauthorized',
					institutions: [],
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
	import { institutionStore, placeStore } from '$lib/utils/stores/selects';
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dashboardDictionary);
	translations.update(commonFormsDictionary);

	export let beverage: DetailsAdmin | null;
	export let forbidden: boolean;
	export let institutions: InstitutionType[];
	export let places: PlaceType[];

	if (forbidden) {
		$session.isLoggedIn = false;
	}

	institutionStore.set(institutions);
	placeStore.set(places);

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
