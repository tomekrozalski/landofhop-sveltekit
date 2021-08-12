<script lang="ts">
	import debounce from 'lodash/debounce.js';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import navigation from '$lib/utils/stores/navigation';
	import BeverageList from './beverageList.svelte';

	let beverages = [];

	async function callToApi(phrase) {
		const response: Basics[] = await serverCall(fetch, Endpoints.beverageSearch, {
			method: 'POST',
			body: JSON.stringify({ phrase, language: 'pl' })
		});

		beverages = response;
	}

	const search = debounce(callToApi, 1000);

	$: search($navigation.searchPhrase);
</script>

{#if beverages.length}
	<BeverageList {beverages} />
{:else}
	szukaj
{/if}
