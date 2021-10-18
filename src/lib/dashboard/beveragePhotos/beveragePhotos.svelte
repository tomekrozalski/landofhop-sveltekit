<script lang="ts">
	import { translate } from 'svelte-intl';
	import Cover from './cover.svelte';
	import Gallery from './gallery.svelte';
</script>

<article>
	<h1>{$translate('dashboard.beveragePhotos.title')}</h1>
	<Cover />
	<Gallery />
</article>

<style>
	article {
		margin-bottom: 12rem;
	}
</style>
