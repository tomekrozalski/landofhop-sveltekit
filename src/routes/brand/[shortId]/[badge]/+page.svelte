<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import BeverageList from '$lib/templates/BeverageList/BeverageList.svelte';
	import Timeline from './Timeline/Timeline.svelte';
	import dictionary from './dictionary.json';
	import type { BrandTimelineData } from './types.d';
	import type { PageData } from './$types';

	translations.update(dictionary);

	export let data: PageData;
	let selectedBar: BrandTimelineData | null = null;

	$: ({ name } = data.insitution);
</script>

<svelte:head>
	<title>{$translate('brand.title', { name: data.insitution.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<MarkLanguage tag="h1" {name} />
	<Timeline bind:selectedBar />
</article>

{#if selectedBar?.beverages}
	<BeverageList beverages={selectedBar.beverages} />
{/if}
