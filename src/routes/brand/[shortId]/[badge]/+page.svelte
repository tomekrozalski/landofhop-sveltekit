<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';

	translations.update(dictionary);

	export let data: PageData;

	$: ({ name } = data.insitution);
</script>

<svelte:head>
	<title>{$translate('brand.title', { name: data.insitution.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<MarkLanguage tag="h1" {name} />
	<div>{JSON.stringify(data, null, '\n')}</div>
</article>
