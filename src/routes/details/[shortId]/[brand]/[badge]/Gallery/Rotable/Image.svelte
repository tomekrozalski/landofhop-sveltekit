<script lang="ts">
	import type { Details } from 'src/oldTypes/Beverage/Details';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let loaded: number;
	export let imageIndex: number;
	export let isVisible: boolean = false;
	export let details: Details;
	const { badge, brand, shortId } = details;

	const pixelRatio = window.devicePixelRatio && window.devicePixelRatio >= 1.5 ? '2x' : '1x';
	const imagePathBase = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}/container/webp/${pixelRatio}`;
</script>

<img
	alt=""
	src="{imagePathBase}/{imageIndex.toString().padStart(2, '0')}.webp"
	class:visible={isVisible}
	on:load={() => (loaded = loaded + 1)}
/>

<style>
	img {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		visibility: hidden;
		pointer-events: none;
	}

	img.visible {
		visibility: visible;
	}
</style>
