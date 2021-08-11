<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';

	import type { Details } from '$lib/utils/types/Beverage/Details';
	export let details: Details;
	const { badge, brand, name, shortId } = details;

	const basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;
	const pathJpgRegular = `${basicPath}/container/jpg/1x/01.jpg`;
	const pathJpgLarge = `${basicPath}/container/jpg/2x/01.jpg`;
	const pathWebpRegular = `${basicPath}/container/webp/1x/01.webp`;
	const pathWebpLarge = `${basicPath}/container/webp/2x/01.webp`;

	export let loaded: boolean;

	function loadListener(image) {
		image.onload = () => {
			loaded = true;
		};
	}
</script>

<picture>
	<source type="image/webp" srcSet="{pathWebpRegular} 1x, {pathWebpLarge} 2x" />
	<source srcSet="{pathJpgRegular} 1x, {pathJpgLarge} 2x" />
	<img
		alt={loaded ? `${name.value}, ${brand.name.value}` : ''}
		srcset="{pathJpgRegular} 1x, {pathJpgLarge} 2x"
		src={pathJpgRegular}
		class:loaded
		use:loadListener
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
