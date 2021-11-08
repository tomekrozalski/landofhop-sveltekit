<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';
	import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
	import type { Place as PlaceType } from '$lib/utils/types/Place';
	import type { Style as StyleType } from '$lib/utils/types/Style';

	export async function load({ fetch }) {
		try {
			const [ingredients, institutions, places, styles]: [
				IngredientType[],
				InstitutionType[],
				PlaceType[],
				StyleType[]
			] = await Promise.all([
				serverCall(fetch, Endpoints.ingredients),
				serverCall(fetch, Endpoints.institutions),
				serverCall(fetch, Endpoints.places),
				serverCall(fetch, Endpoints.styles)
			]);

			return { props: { ingredients, institutions, places, styles } };
		} catch {
			return { props: { ingredients: [], institutions: [], places: [], styles: [] } };
		}
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/dashboard.json';
	import {
		editorialStore,
		ingredientsStore,
		institutionStore,
		labelStore,
		placeStore,
		producerStore,
		styleStore
	} from '$lib/dashboard/utils/stores';
	import { initialValues as initialLabelValues } from '$lib/dashboard/beverage/label/initialValues';
	import { initialValues as initialProducerValues } from '$lib/dashboard/beverage/producer/initialValues';
	import { initialValues as initialEditorialValues } from '$lib/dashboard/beverage/editorial/initialValues';
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dictionary as Translations);

	export let ingredients: IngredientType[];
	export let institutions: InstitutionType[];
	export let places: PlaceType[];
	export let styles: StyleType[];

	ingredientsStore.set(ingredients);
	institutionStore.set(institutions);
	placeStore.set(places);
	styleStore.set(styles);
	labelStore.set(initialLabelValues);
	producerStore.set(initialProducerValues);
	editorialStore.set(initialEditorialValues);

	setContext('formType', 'add');
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.addNewBeverage')}</title>
</svelte:head>

<Beverage />
