<script lang="ts">
	import { translate } from 'svelte-intl';
	import Markdown from '$lib/atoms/Markdown.svelte';
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
