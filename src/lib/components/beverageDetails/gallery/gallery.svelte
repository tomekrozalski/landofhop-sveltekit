<script lang="ts">
	import { onMount } from 'svelte';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './coverImage.svelte';
	import Rotable from './rotable/rotable.svelte';
	import BrokenContainer from './brokenContainer.svelte';

	export let details: Details;
	const { badge, brand, name, photos, shortId } = details;

	let loaded = false;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<section>
	{#if photos?.gallery}
		{#if !loaded && photos.outline}
			<span transition:toggleVisibility>
				{@html photos.outline.replace(
					'<svg',
					`<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; transition: var(--transition-default);"`
				)}
			</span>
		{:else}
			<Rotable {details} />
		{/if}
		{#if mounted}
			<CoverImage {details} bind:loaded />
		{/if}
		<noscript>
			<picture>
				<img
					src="{PHOTO_SERVER}/{brand.badge}/{badge}/{shortId}/container/jpg/1x/01.jpg"
					alt="{name.value}, {brand.name.value}"
					style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center;"
				/>
			</picture>
		</noscript>
	{:else}
		<BrokenContainer {details} />
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
</style>
