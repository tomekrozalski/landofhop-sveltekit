<script lang="ts">
	import { translate } from 'svelte-intl';
	import ProgressList from '$lib/dashboard/elements/progressList/progressList.svelte';
	import Label from './label/label.svelte';

	let page = 'label';
</script>

<article>
	<h1>{$translate('dashboard.beverage.addNewBeverage')}</h1>
	<ProgressList />
	{#if page === 'label'}
		<Label />
	{/if}
	<!-- {page === 'producer' && <Producer />} -->
	<!-- {page === 'editorial' && <Editorial />} -->
	<!-- <EditModal /> -->
</article>

<style>
	article :global(header) {
		margin-bottom: 2.5rem;
	}
	article :global(header h2) {
		margin-bottom: 0;
	}

	article :global(header p) {
		text-align: right;
		font-size: 1.4rem;
		color: var(--color-grey-1);
	}

	article :global(h3) {
		margin-top: 2rem;
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
		position: relative;
	}

	article :global(h3::after) {
		display: block;
		height: 1px;
		width: 100%;
		content: '';
		background: var(--color-grey-3);
		position: absolute;
		top: 50%;
		z-index: -1;
	}

	article :global(h3 span) {
		margin-left: 4rem;
		padding: 0 2rem;
		background: var(--color-white);
	}
</style>
