<script lang="ts">
	export let beverage: Basics;
	export let loaded: boolean;

	import { onMount } from 'svelte';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	const getPath = (format: 'webp' | 'jpg', size: 1 | 2) => {
		const basicPath = `${PHOTO_SERVER}/${beverage.brand.badge}/${beverage.badge}/${beverage.shortId}`;
		return `${basicPath}/cover/${format}/${size}x.${format}`;
	};

	let thisImage;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<picture>
	<source type="image/webp" srcSet={`${getPath('webp', 1)} 1x, ${getPath('webp', 2)} 2x`} />
	<source srcSet={`${getPath('jpg', 1)} 1x, ${getPath('jpg', 2)} 2x`} />
	<img
		alt={loaded ? `${beverage.name.value}, ${beverage.brand.name.value}` : ''}
		srcset={`${getPath('jpg', 1)} 1x, ${getPath('jpg', 2)} 2x`}
		src={getPath('jpg', 1)}
		class:loaded
		bind:this={thisImage}
		loading="lazy"
	/>
</picture>

<style>
	img {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		opacity: 0.2;
	}

	.loaded {
		opacity: 1;
		transition: opacity var(--transition-default);
	}
</style>
