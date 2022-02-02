<script lang="ts">
	import { onMount } from 'svelte';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import IntersectionObserver from '$lib/utils/helpers/intersectionObserver.svelte';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './coverImage.svelte';

	export let beverage: Basics;
	export let eager: boolean;
	const { badge, brand, name, coverImage, shortId } = beverage;

	let loaded = false;
	let nativeLoading = false;

	onMount(() => {
		if ('loading' in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
</script>

<div style:aspect-ratio="{coverImage?.width} / {coverImage?.height}">
	{#if !loaded && coverImage?.outline}
		<span class="outline-wrapper" transition:toggleVisibility>
			{@html coverImage.outline}
		</span>
	{/if}
	{#if eager || nativeLoading}
		<CoverImage {beverage} {eager} bind:loaded />
	{:else}
		<IntersectionObserver once={true} let:intersecting>
			{#if intersecting}
				<CoverImage {beverage} {eager} bind:loaded />
			{/if}
		</IntersectionObserver>
		<noscript>
			<picture>
				<img
					src="{PHOTO_SERVER}/{brand.badge}/{badge}/{shortId}/cover/jpg/1x.jpg"
					alt="{name.value}, {brand.name.value}"
					style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center;"
				/>
			</picture>
		</noscript>
	{/if}
</div>

<style>
	div {
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.outline-wrapper :global(svg) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
