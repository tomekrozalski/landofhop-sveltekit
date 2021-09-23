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
	article :global(header h2) {
		margin-bottom: 0;
	}

	article :global(header p) {
		text-align: right;
		color: var(--color-grey-1);
		font-size: 1.4rem;
	}
</style>
