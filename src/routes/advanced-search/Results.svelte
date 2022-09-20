<script lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import Spinner from '$lib/elements/spinners/FullWidth.svelte';
	import Total from '$lib/elements/Pagination/Total.svelte';

	import BeverageList from '../../routes/beverageList/BeverageList.svelte';

	import NothingFound from '../layout/SearchResults/NothingFound.svelte'; // @ToDo
	import type AdvancedSearchData from './AdvancedSearchData.type';
	import Pagination from './Pagination.svelte';

	export let data: AdvancedSearchData;

	async function callToApi(values: AdvancedSearchData) {
		const response: {
			beverages: Basics[];
			total: number;
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
		data.page = params.get('page') ? Number(params.get('page')) : null;
		data.styleTags = params.get('styleTags')?.split(',') ?? null;
	}
</script>

<svelte:window on:popstate={updateData} />

{#if Object.values(data).find(Boolean)}
	{#await callToApi(data)}
		<Spinner />
	{:then { beverages, total }}
		{#if beverages.length}
			<Total currentPage={data.page ?? 1} {total} />
			<BeverageList {beverages} />
			{#if total > BEVERAGES_ON_PAGE}
				<Pagination order={data.page ?? 1} {total} />
			{/if}
		{:else}
			<NothingFound />
		{/if}
	{/await}
{/if}
