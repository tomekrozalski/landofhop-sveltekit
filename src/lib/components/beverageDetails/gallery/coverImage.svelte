<script lang="ts">
	import { onMount } from 'svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	import { beverage } from '$lib/utils/stores/beverage';

	$: getPath = (format: 'webp' | 'jpg', size: 1 | 2) => {
		const basicPath = `${PHOTO_SERVER}/${$beverage.brand.badge}/${$beverage.badge}/${$beverage.shortId}`;
		return `${basicPath}/container/${format}/${size}x/01.${format}`;
	};

	export let loaded: boolean;
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
		alt={loaded ? `${$beverage.name.value}, ${$beverage.brand.name.value}` : ''}
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
		width: 220px;
		height: 500px;
		opacity: 0;
	}

	.loaded {
		opacity: 1;
		transition: opacity var(--transition-default);
	}
</style>
