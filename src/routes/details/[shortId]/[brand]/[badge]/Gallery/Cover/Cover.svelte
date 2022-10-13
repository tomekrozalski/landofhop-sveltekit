<script lang="ts">
	import { page } from '$app/stores';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import SingleImage from './SingleImage.svelte';
	import Rotable from './Rotable/Rotable.svelte';
	import BrokenContainer from './BrokenContainer.svelte';

	let loaded = false;
</script>

<section>
	{#if $page.data.details.photos?.gallery}
		{#if !loaded && $page.data.details.photos.outline}
			<span class="outline-wrapper" transition:toggleVisibility>
				{@html $page.data.details.photos.outline}
			</span>
		{:else}
			<Rotable />
		{/if}
		<SingleImage bind:loaded />
	{:else}
		<BrokenContainer />
	{/if}
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		grid-area: gallery;
		width: 220px;
		height: 500px;
		margin: 0 auto;
		position: relative;
	}

	.outline-wrapper :global(svg) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
