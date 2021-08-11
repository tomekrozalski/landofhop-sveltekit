<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Image from './image.svelte';

	export let areImagesLoaded: boolean;
	export let details: Details;
	export let currentlyVisibleImageIndex: number;
	const imagesInGallery = details.photos.gallery;
	const imageIndexArray = new Array(imagesInGallery).fill('').map((_, i) => i + 1);

	let loaded = 0;

	$: if (loaded === imagesInGallery) {
		areImagesLoaded = true;
	}
</script>

{#each imageIndexArray as imageIndex}
	<Image {imageIndex} isVisible={imageIndex === currentlyVisibleImageIndex} {details} bind:loaded />
{/each}
