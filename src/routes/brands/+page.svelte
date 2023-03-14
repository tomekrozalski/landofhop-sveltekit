<script lang="ts">
	import { translate } from 'svelte-intl';
	import Table from './Table/Table.svelte';
	import RatesInfo from './RatesInfo.svelte';
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('brands.title')}</h1>
	<RatesInfo />
</article>

<Table />

<style>
	article {
		padding-bottom: 1rem;
	}
</style>
