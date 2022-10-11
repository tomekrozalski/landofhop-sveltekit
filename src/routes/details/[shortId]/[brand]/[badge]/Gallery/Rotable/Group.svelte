<script lang="ts">
	import type { Details } from '$types/Beverage/Details';
	import Image from './Image.svelte';

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
	<Image
		{imageIndex}
		isVisible={[currentlyVisibleImageIndex, currentlyVisibleImageIndex - 1].includes(imageIndex)}
		{details}
		bind:loaded
	/>
{/each}
