<script lang="ts">
	import debounce from 'lodash/debounce.js';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import navigation from '$lib/utils/stores/navigation';
	import Spinner from '$lib/elements/spinner.svelte';
	import BeverageList from './beverageList.svelte';
	import NothingFound from './nothingFound.svelte';

	let value;

	async function callToApi(phrase) {
		const response: Basics[] = await serverCall(fetch, Endpoints.beverageSearch, {
			pathParams: ['pl', phrase.trim()]
		});

		return response;
	}

	const updateValue = debounce((newValue) => (value = newValue), 1000);
	$: updateValue($navigation.searchPhrase);
</script>

{#if value}
	{#await callToApi(value)}
		<Spinner />
	{:then beverages}
		{#if beverages.length}
			<BeverageList {beverages} />
		{:else}
			<NothingFound />
		{/if}
	{/await}
{/if}
