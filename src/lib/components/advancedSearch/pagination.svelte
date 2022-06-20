<script lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import Element from '$lib/components/beverageList/pagination/element.svelte';
	import Wrapper from '$lib/components/beverageList/pagination/wrapper.svelte';
	import pushState from '$lib/utils/helpers/pushState';

	export let order: number;
	export let total: number;
	let pagesCount = Math.ceil(total / BEVERAGES_ON_PAGE);
	let max = pagesCount > 5 ? 4 : 1;

	const getStartingPoint = () => {
		if (order <= 5) {
			return 1;
		}

		if (order + 2 >= pagesCount) {
			return pagesCount - 4;
		}

		return order - 2;
	};

	const changeParam = (e: Event) => {
		const page = Number((e.target as HTMLButtonElement).dataset.page);
		const params = new URLSearchParams(location.search);

		if (page > 1) {
			params.set('page', page.toString());
		} else {
			params.delete('page');
		}

		pushState(params);
	};

	$: pages = new Array(order === 5 || order === pagesCount - 4 ? 5 : max)
		.fill('')
		.reduce((acc) => [...acc, acc.pop() + 1], [getStartingPoint()]);
</script>

<Wrapper>
	{#if order === 1}
		<Element label="←" tag="span" />
	{:else}
		<Element
			action={changeParam}
			active
			data-page={order - 1}
			label="←"
			tag="button"
			type="button"
		/>
	{/if}
	{#if order > 5}
		<Element action={changeParam} active data-page="1" label="1" tag="button" type="button" />
		<Element label="…" tag="span" />
	{/if}
	{#each pages as page}
		<Element
			action={changeParam}
			active
			current={page === order}
			data-page={page}
			label={page}
			tag="button"
			type="button"
		/>
	{/each}
	{#if pagesCount > order + 4}
		<Element label="…" tag="span" />
	{/if}
	{#if pagesCount > order + 2}
		<Element
			action={changeParam}
			active
			data-page={pagesCount.toString()}
			label={pagesCount.toString()}
			tag="button"
			type="button"
		/>
	{/if}
	{#if pagesCount === order}
		<Element label="→" tag="span" />
	{:else}
		<Element
			action={changeParam}
			active
			data-page={order + 1}
			label="→"
			tag="button"
			type="button"
		/>
	{/if}
</Wrapper>
