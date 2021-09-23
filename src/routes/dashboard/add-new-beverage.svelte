<!-- <script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';

	export async function load({ fetch }) {
		const test: any = await serverCall(fetch, Endpoints.beverageDetails);

		return { props: {test} };
	}
</script> -->
<script lang="ts">
	import { translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/dashboard.json';
	import AddNewBeverage from '$lib/dashboard/beverage/addNewBeverage.svelte';

	translations.update(dictionary as Translations);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, add new beverage</title>
</svelte:head>

<AddNewBeverage />
