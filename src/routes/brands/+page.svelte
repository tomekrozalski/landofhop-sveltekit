<script lang="ts">
	import { translate } from 'svelte-intl';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('brands.title')}</h1>
	<ul>
		{#each data.insitutions as { badge, name, shortId }}
			<li><MarkLanguage href="/brand/{shortId}/{badge}" tag="a" {name} /></li>
		{/each}
	</ul>
</article>

<style>
	li {
		display: inline;
	}

	li:not(:last-of-type)::after {
		content: ', ';
	}

	li :global(a) {
		color: var(--color-black);
	}

	li :global(a:hover) {
		text-decoration: underline;
	}
</style>
