<script lang="ts">
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import BeverageList from '$lib/templates/BeverageList/BeverageList.svelte';
	import Timeline from './Timeline/Timeline.svelte';
	import Legend from './Legend/Legend.svelte';
	import Places from './Places/Places.svelte';
	import type { SelectedBar } from './types.d';

	export let data;
	let selectedBar: SelectedBar | null = null;

	$: ({ name } = data.institution);
</script>

<svelte:head>
	<title>{$translate('brand.title', { name: data.institution.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<MarkLanguage tag="h1" {name} />
	<div>
		<Places />
	</div>
	<Timeline bind:selectedBar />
	<Legend />
</article>

{#if selectedBar?.items}
	<BeverageList beverages={selectedBar.items} />
{/if}

<style>
	div {
		display: flex;
		justify-content: flex-end;
	}
</style>
