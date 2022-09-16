<script lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';

	import Element from './Element.svelte';
	import Wrapper from './Wrapper.svelte';
	import getElements from './getElements';

	export let order: number;
	export let total: number;
	let pagesCount = Math.ceil(total / BEVERAGES_ON_PAGE);

	$: pages = getElements(order, total);
</script>

<Wrapper>
	{#if order === 1}
		<Element label="←" tag="span" />
	{:else}
		<Element
			active
			href={order > 2 ? `/list/${order - 1}` : '/'}
			label="←"
			data-sveltekit-prefetch
			tag="a"
		/>
	{/if}
	{#each pages as page}
		<Element
			active={page !== '…'}
			current={page === order}
			href={page === 1 ? '/' : `/list/${page}`}
			label={page.toString()}
			data-sveltekit-prefetch
			tag={page === '…' ? 'span' : 'a'}
		/>
	{/each}
	{#if pagesCount === order}
		<Element label="→" tag="span" />
	{:else}
		<Element active href="/list/{order + 1}" label="→" data-sveltekit-prefetch tag="a" />
	{/if}
</Wrapper>
