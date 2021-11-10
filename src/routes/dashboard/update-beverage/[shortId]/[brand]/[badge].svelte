<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
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

	export async function load({ fetch, page }) {
		try {
			const [beverage, ingredients, institutions, places, styles]: [
				DetailsAdmin,
				IngredientType[],
				InstitutionType[],
				PlaceType[],
				StyleType[]
			] = await Promise.all([
				await serverCall(fetch, Endpoints.beverageDetailsAdmin, {
					pathParams: [page.params.shortId]
				}),
				serverCall(fetch, Endpoints.ingredients),
				serverCall(fetch, Endpoints.institutions),
				serverCall(fetch, Endpoints.places),
				serverCall(fetch, Endpoints.styles)
			]);

			return { props: { beverage, ingredients, institutions, places, styles } };
		} catch {
			return {
				props: { beverage: null, ingredients: [], institutions: [], places: [], styles: [] }
			};
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
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dictionary as Translations);

	export let beverage: DetailsAdmin | null;
	export let ingredients: IngredientType[];
	export let institutions: InstitutionType[];
	export let places: PlaceType[];
	export let styles: StyleType[];

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
