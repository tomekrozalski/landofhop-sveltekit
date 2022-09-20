<script lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import pushState from '$lib/utils/helpers/pushState';
	import Element from '$lib/elements/Pagination/Element.svelte';
	import Wrapper from '$lib/elements/Pagination/Wrapper.svelte';
	import getElements from '$lib/elements/Pagination/getElements';

	export let order: number;
	export let total: number;
	let pagesCount = Math.ceil(total / BEVERAGES_ON_PAGE);

	$: pages = getElements(order, total);

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
	{#each pages as page}
		<Element
			action={changeParam}
			active={page !== '…'}
			current={page === order}
			data-page={page}
			label={page.toString()}
			tag="button"
			type="button"
		/>
	{/each}
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
