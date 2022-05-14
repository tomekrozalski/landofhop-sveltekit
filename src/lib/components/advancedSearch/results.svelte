<script lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	// import Spinner from '$lib/elements/spinner.svelte';
	import BeverageList from '../beverageList/beverageList.svelte';

	import type AdvancedSearchData from './AdvancedSearchData.type';

	export let data: AdvancedSearchData;

	async function callToApi(abc) {
		console.log('abc', abc);

		const response: Basics[] = await apiCall(fetch, Endpoints.searchByPhrase, {
			pathParams: ['pl', 'ipa']
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

{#await callToApi(data)}
	loading
{:then beverages}
	{#if beverages.length}
		<BeverageList {beverages} />
	{:else}
		NothingFound
	{/if}
{/await}
