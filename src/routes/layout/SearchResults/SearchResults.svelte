<script lang="ts">
	import { debounce } from 'lodash-es';
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import pushState from '$lib/utils/helpers/pushState';
	import Spinner from '$lib/atoms/spinners/FullScreen.svelte';
	import Total from '$lib/molecules/pagination/elements/Total.svelte';
	import Pagination from '$lib/molecules/pagination/Pagination.svelte';
	import BeverageList from '$lib/templates/BeverageList/BeverageList.svelte';
	import NothingFound from '$lib/templates/BeverageList/NothingFound.svelte';
	import type { Basics } from '$lib/templates/BeverageList/Basics.d';
	import layoutStore from '../utils/store';
	import AdvancedSearchLink from './AdvancedSearchLink.svelte';

	let order = 1;
	let value: string;

	async function callToApi(phrase: string, page: number) {
		const response = await fetch(`/api/search/byPhrase/pl/${phrase.trim()}/${page}`);
		const data: { beverages: Basics[]; total: number } = await response.json();

		return data;
	}

	const updateValue = debounce((newValue) => {
		const params = new URLSearchParams(location.search);
		params.delete('page');
		pushState(params);

		order = 1;
		value = newValue;
	}, 1000);

	$: updateValue($layoutStore.searchPhrase);

	function updateOrder() {
		const params = new URLSearchParams(location.search);
		order = params.get('page') ? Number(params.get('page')) : 1;
	}
</script>

<svelte:window on:popstate={updateOrder} />

<AdvancedSearchLink />
{#if value}
	{#await callToApi(value, order)}
		<Spinner />
	{:then { beverages, total }}
		{#if beverages.length}
			<Total currentPage={order} {total} inline />
			<BeverageList {beverages} />
			{#if total > BEVERAGES_ON_PAGE}
				<Pagination {order} {total} />
			{/if}
		{:else}
			<NothingFound />
		{/if}
	{/await}
{/if}
