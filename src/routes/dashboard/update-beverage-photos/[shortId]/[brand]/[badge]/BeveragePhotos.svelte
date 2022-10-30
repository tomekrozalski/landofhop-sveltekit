<script lang="ts">
	import { translate } from 'svelte-intl';
	import Navigation from '$Beverage/Navigation.svelte';
	import Cover from './Cover.svelte';
	import Gallery from './Gallery.svelte';
	import ViewFromAbove from './ViewFromAbove.svelte';
</script>

<article>
	<h1>{$translate('dashboard.beverage.photos.name')}</h1>
	<Navigation />
	<Cover />
	<Gallery />
	<ViewFromAbove />
</article>
