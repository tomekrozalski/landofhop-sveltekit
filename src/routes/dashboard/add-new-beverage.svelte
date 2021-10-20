<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Institution as InstitutionType } from '$lib/utils/types/Institution';

	export async function load({ fetch }) {
		try {
			const institutions: InstitutionType[] = await serverCall(fetch, Endpoints.institutions);
			return { props: { institutions } };
		} catch {
			return { props: { institutions: [] } };
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

	export let institutions: InstitutionType[];
	institutionStore.set(institutions);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.addNewBeverage')}</title>
</svelte:head>

<Beverage type="add" />
