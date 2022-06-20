<script lang="ts">
	import { debounce } from 'lodash-es';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import navigation from '$lib/utils/stores/navigation';
	import pushState from '$lib/utils/helpers/pushState';
	import Spinner from '$lib/elements/spinners/fullScreen.svelte';
	import Pagination from '$lib/components/advancedSearch/pagination.svelte';
	import Total from '$lib/components/advancedSearch/total.svelte';

	import AdvancedSearchLink from './advancedSearchLink.svelte';
	import BeverageList from './beverageList.svelte';
	import NothingFound from './nothingFound.svelte';

	let order = 1;
	let value;

	async function callToApi(phrase, page) {
		const response: {
			beverages: Basics[];
			total: number;
		} = await apiCall(fetch, Endpoints.searchByPhrase, {
			pathParams: ['pl', phrase.trim(), page]
		});

		return response;
	}

	const updateValue = debounce((newValue) => {
		const params = new URLSearchParams(location.search);
		params.delete('page');
		pushState(params);

		order = 1;
		value = newValue;
	}, 1000);

	$: updateValue($navigation.searchPhrase);

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
