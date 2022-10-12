<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';

	translations.update(dictionary);

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('brand.title', { name: data.insitution.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<h1>{data.insitution.name.value}</h1>
	<div>{JSON.stringify(data, null, '\n')}</div>
</article>
