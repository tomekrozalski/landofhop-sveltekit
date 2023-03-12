<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from './utils/dictionary.json';
	import { beveragePhotosStore } from './utils/stores';
	import Navigation from '$Beverage/Navigation.svelte';
	import Cover from './Cover/Cover.svelte';
	import Gallery from './Gallery/Gallery.svelte';
	import ViewFromAbove from './ViewFromAbove/ViewFromAbove.svelte';

	translations.update(dictionary as Translations);

	export let data;
	beveragePhotosStore.set(data.photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.beverage.photos.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('dashboard.beverage.photos.name')}</h1>
	<Navigation />
	<Cover />
	<Gallery />
	<ViewFromAbove />
</article>
