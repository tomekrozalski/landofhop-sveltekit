<script lang="ts">
	import { onMount } from 'svelte';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import IntersectionObserver from '$lib/utils/helpers/intersectionObserver.svelte';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './coverImage.svelte';

	export let beverage: Basics;
	const { badge, brand, name, coverImage, shortId } = beverage;

	let loaded = false;
	let nativeLoading = false;

	onMount(() => {
		if ('loading' in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
</script>

<div style="padding-bottom: {(coverImage?.height / coverImage?.width) * 100}%">
	{#if !loaded && coverImage?.outline}
		<span transition:toggleVisibility>
			{@html coverImage.outline.replace(
				'<svg',
				`<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; transition: var(--transition-default);"`
			)}
		</span>
	{/if}
	<IntersectionObserver once={true} let:intersecting>
		{#if intersecting || nativeLoading}
			<CoverImage {beverage} bind:loaded />
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
</div>

<style>
	div {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
