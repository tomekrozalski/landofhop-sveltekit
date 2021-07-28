<script lang="ts">
	export let beverage: Basics;
	let prevBeverage;

	import { onMount } from 'svelte';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import IntersectionObserver from '$lib/utils/helpers/intersectionObserver.svelte';
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import CoverImage from './coverImage.svelte';

	$: formattedCoverOutline = beverage.photos.outlines.cover.replace(
		'<svg',
		`<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; transition: var(--transition-default);"`
	);

	let loaded = false;
	let nativeLoading = false;

	$: if (prevBeverage !== beverage) {
		loaded = false;
		prevBeverage = beverage;
	}

	onMount(() => {
		if ('loading' in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
</script>

<div
	style={`padding-bottom: ${
		(beverage.photos?.cover?.height / beverage.photos?.cover?.width) * 100
	}%`}
>
	{#if !loaded}
		<span transition:toggleVisibility>
			{@html formattedCoverOutline}
		</span>
	{/if}
	<IntersectionObserver once={true} let:intersecting>
		{#if intersecting || nativeLoading}
			<CoverImage {beverage} bind:loaded />
		{/if}
	</IntersectionObserver>
</div>

<style>
	div {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
