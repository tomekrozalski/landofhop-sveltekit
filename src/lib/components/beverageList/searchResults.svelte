<script lang="ts">
	import { debounce } from 'lodash-es';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import navigation from '$lib/utils/stores/navigation';
	import Spinner from '$lib/elements/spinner.svelte';
	import BeverageList from './beverageList.svelte';
	import NothingFound from './nothingFound.svelte';
	import AdvancedSearchLink from './advancedSearchLink.svelte';

	let value;

	async function callToApi(phrase) {
		const response: Basics[] = await apiCall(fetch, Endpoints.searchByPhrase, {
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
{:else}
	<AdvancedSearchLink />
{/if}
