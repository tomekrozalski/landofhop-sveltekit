<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import Markdown from '$lib/elements/Markdown.svelte';
	import dictionary from '$lib/utils/dictionary/screens/about.json';

	translations.update(dictionary);
</script>

<svelte:head>
	<title>{$translate('about.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('about.header')}</h1>
	<Markdown value={$translate('about.body')} />
</article>

<style>
	article {
		max-width: 54rem;
		padding: 2rem 2rem 8rem 2rem;
	}
</style>
