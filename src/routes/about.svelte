<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import marked from 'marked';
	import dictionary from '$lib/utils/dictionary/about.json';
	import removeOrphans from '$lib/utils/helpers/removeOrphans';

	translations.update(dictionary);
</script>

<svelte:head>
	<title>{$translate('about.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('about.header')}</h1>
	<div>{@html removeOrphans(marked($translate('about.body')))}</div>
</article>

<style>
	article {
		max-width: 54rem;
		padding: 2rem;
	}

	div :global(a) {
		color: var(--color-success);
		border-bottom: 1px solid var(--color-white);
		transition: border-color var(--transition-default);
	}

	div :global(a:hover) {
		border-color: var(--color-black);
	}
</style>
