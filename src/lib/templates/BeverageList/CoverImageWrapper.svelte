<script lang="ts">
	import { onMount } from 'svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import IntersectionObserver from '$lib/utils/helpers/IntersectionObserver.svelte';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './CoverImage.svelte';
	import type { Basics } from './Basics.d';

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

<!--
	style:padding-top is temporary solution for older Safari
	<div style:aspect-ratio="{coverImage?.width} / {coverImage?.height}">
-->
<a
	href="/details/{beverage.shortId}/{beverage.brand.badge}/{beverage.badge}"
	style:padding-top="{((coverImage?.height || 0) / (coverImage?.width || 0)) * 100}%"
	aria-label="{name.value}, {brand.name.value}"
>
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
</a>

<style>
	a {
		width: 100%;
		height: 0;
		position: relative;
		transform: scale(1);
		transition: transform var(--transition-default);
	}

	a:hover,
	a:focus {
		transform: scale(0.9);
		outline: none;
	}

	a:focus::before {
		display: block;
		content: '';
		position: absolute;
		inset: 0;
		outline: 1rem solid var(--color-grey-3);
	}

	.outline-wrapper :global(svg) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
