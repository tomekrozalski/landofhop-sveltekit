<script lang="ts">
	import { translate } from 'svelte-intl';
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';

	export let currentPage: number;
	export let inline: boolean = false;
	export let total: number;
	let pages = Math.ceil(total / BEVERAGES_ON_PAGE);
</script>

<section class:inline>
	<div>
		{$translate('global.foundCount')}
		<strong>{total}</strong>
	</div>
	{#if pages > 1}
		<div>
			strona z wynikami: <strong>{currentPage} / {pages}</strong>
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		gap: 2rem;
		justify-content: space-between;
		max-width: var(--size-container-max-width);
		padding: 0 1rem;
		margin: 0 auto;
	}

	section.inline {
		justify-content: flex-start;
	}

	div {
		padding: 2rem 0;
	}

	strong {
		display: inline-block;
		margin-left: 0.4rem;
		padding: 0 0.8rem;
		background-color: var(--color-success);
		color: var(--color-white);
		font-weight: var(--font-weight-regular);
		line-height: 1.6;
	}
</style>
