<script lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import Spinner from '$lib/elements/spinners/fullWidth.svelte';
	import NothingFound from '$lib/components/beverageList/nothingFound.svelte';
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';

	import type AdvancedSearchData from './AdvancedSearchData.type';
	import Count from './count.svelte';

	export let data: AdvancedSearchData;

	async function callToApi(values) {
		const response: {
			count: number;
			beverages: Basics[];
		} = await apiCall(fetch, Endpoints.advancedSearch, {
			method: 'POST',
			body: JSON.stringify({ ...values, language: 'pl' })
		});

		return response;
	}

	function updateData() {
		const params = new URLSearchParams(location.search);

		data.brands = params.get('brands')?.split(',') ?? null;
		data.ingredientTags = params.get('ingredientTags')?.split(',') ?? null;
		data.name = params.get('name') ?? null;
		data.styleTags = params.get('styleTags')?.split(',') ?? null;
	}
</script>

<svelte:window on:popstate={updateData} />

{#if Object.values(data).find(Boolean)}
	{#await callToApi(data)}
		<Spinner />
	{:then { beverages, count }}
		<Count {count} />
		{#if beverages.length}
			<BeverageList {beverages} />
		{:else}
			<NothingFound />
		{/if}
	{/await}
{/if}
