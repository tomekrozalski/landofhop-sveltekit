<script lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import type { Basics } from '$lib/templates/BeverageList/Basics.d';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import Total from '$lib/molecules/pagination/elements/Total.svelte';
	import BeverageList from '$lib/templates/BeverageList/BeverageList.svelte';
	import NothingFound from '$lib/templates/BeverageList/NothingFound.svelte';

	import Pagination from './Pagination.svelte';
	import type AdvancedSearchData from './AdvancedSearchData.type';

	export let data: AdvancedSearchData;

	async function callToApi(values: AdvancedSearchData) {
		const response = await fetch('/api/search/advanced', {
			method: 'POST',
			body: JSON.stringify({
				...values,
				language: 'pl'
			})
		});

		const data: {
			beverages: Basics[];
			total: number;
		} = await response.json();

		return data;
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
