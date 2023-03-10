<script lang="ts">
	import { page } from '$app/stores';
	import Image from './Image.svelte';

	export let areImagesLoaded: boolean;
	export let image: number;

	$: imagesInGallery = $page.data.details.photos.gallery;
	$: imageIndexArray = new Array(imagesInGallery).fill('').map((_, i) => i + 1);

	let loaded = 0;

	$: if (loaded === imagesInGallery) {
		areImagesLoaded = true;
	}
</script>

{#each imageIndexArray as imageIndex}
	<Image {imageIndex} isVisible={[image, image - 1].includes(imageIndex)} bind:loaded />
{/each}
