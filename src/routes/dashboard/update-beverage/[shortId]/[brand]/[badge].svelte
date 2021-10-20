<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Institution as InstitutionType } from '$lib/utils/types/Institution';
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
			const { shortId, brand, badge } = page.params;
			const beverage: DetailsAdmin = await serverCall(fetch, Endpoints.beverageDetailsAdmin, {
				pathParams: [shortId, brand, badge]
			});

			const institutions: InstitutionType[] = await serverCall(fetch, Endpoints.institutions);
			return { props: { beverage, institutions } };
		} catch {
			return { props: { beverage: null, institutions: [] } };
		}
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/dashboard.json';
	import { institutionStore } from '$lib/dashboard/utils/stores';
	import Beverage from '$lib/dashboard/beverage/beverage.svelte';

	translations.update(dictionary as Translations);

	export let beverage: DetailsAdmin | null;
	export let institutions: InstitutionType[];

	console.log({ beverage });

	/* ToDo update:
	 * labelStore
	 * producerStore
	 * editorialStore
	 */

	institutionStore.set(institutions);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeverage')}</title>
</svelte:head>

<Beverage type="update" />
