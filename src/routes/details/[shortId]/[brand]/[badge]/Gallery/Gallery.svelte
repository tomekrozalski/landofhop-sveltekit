<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';

	import CoverImage from './CoverImage.svelte';
	import Rotable from './Rotable/Rotable.svelte';
	import BrokenContainer from './BrokenContainer.svelte';
	import Cap from './Cap.svelte';
	import ViewFromAbove from './ViewFromAbove.svelte';

	export let details: Details;

	let loaded = false;
</script>

<div>
	<section>
		{#if details.photos?.gallery}
			{#if !loaded && details.photos.outline}
				<span class="outline-wrapper" transition:toggleVisibility>
					{@html details.photos.outline}
				</span>
			{:else}
				<Rotable {details} />
			{/if}
			<CoverImage {details} bind:loaded />
		{:else}
			<BrokenContainer {details} />
		{/if}
	</section>
	<ViewFromAbove {details} />
	<Cap {details} />
</div>

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
