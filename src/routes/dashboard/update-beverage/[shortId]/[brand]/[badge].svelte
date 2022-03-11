<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
	import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
	import type { Place as PlaceType } from '$lib/utils/types/Place';
	import type { Style as StyleType } from '$lib/utils/types/Style';
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
			const [beverage, ingredients, institutions, places, styles]: [
				DetailsAdmin,
				IngredientType[],
				InstitutionType[],
				PlaceType[],
				StyleType[]
			] = await Promise.all([
				apiCall(fetch, Endpoints.beverageDetailsAdmin, {
					pathParams: [params.shortId]
				}),
				apiCall(fetch, Endpoints.ingredients),
				apiCall(fetch, Endpoints.institutions),
				apiCall(fetch, Endpoints.places),
				apiCall(fetch, Endpoints.styles)
			]);

			return { props: { beverage, forbidden: false, ingredients, institutions, places, styles } };
		} catch (err) {
			return {
				props: {
					beverage: null,
					forbidden: err.message === 'Forbidden',
					ingredients: [],
					institutions: [],
					places: [],
					styles: []
				}
			};
		}
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import { session } from '$app/stores';
	import dictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import {
		editorialStore,
		ingredientsStore,
		institutionStore,
		labelStore,
		placeStore,
		producerStore,
		styleStore
	} from '$lib/dashboard/utils/stores';
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dictionary as Translations);

	export let beverage: DetailsAdmin | null;
	export let forbidden: boolean;
	export let ingredients: IngredientType[];
	export let institutions: InstitutionType[];
	export let places: PlaceType[];
	export let styles: StyleType[];

	if (forbidden) {
		$session.isLoggedIn = false;
	}

	ingredientsStore.set(ingredients);
	institutionStore.set(institutions);
	placeStore.set(places);
	styleStore.set(styles);

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
