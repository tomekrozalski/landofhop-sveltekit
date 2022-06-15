<script lang="ts">
	import { translate } from 'svelte-intl';
	import Navigation from '$lib/dashboard/elements/navigation.svelte';
	import Cover from './cover.svelte';
	import Gallery from './gallery.svelte';
	import ViewFromAbove from './viewFromAbove.svelte';
</script>

<article>
	<h1>{$translate('dashboard.beveragePhotos.title')}</h1>
	<Navigation />
	<Cover />
	<Gallery />
	<ViewFromAbove />
</article>
