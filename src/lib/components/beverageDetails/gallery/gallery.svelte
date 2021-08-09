<script lang="ts">
	import { beverage } from '$lib/utils/stores/beverage';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './coverImage.svelte';
	import Ratable from './rotable/rotable.svelte';

	let loaded = false;
</script>

<section>
	{#if $beverage.photos.gallery}
		{#if !loaded}
			<span transition:toggleVisibility>
				{@html $beverage.photos.outlines.gallery.replace(
					'<svg',
					`<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; transition: var(--transition-default);"`
				)}
			</span>
		{/if}
		<CoverImage bind:loaded />
		<Ratable />
	{:else}
		broken container image
	{/if}
</section>

<style>
	section {
		grid-area: gallery;
		width: 220px;
		height: 500px;
		margin: 0 auto;
		position: relative;
	}
</style>
