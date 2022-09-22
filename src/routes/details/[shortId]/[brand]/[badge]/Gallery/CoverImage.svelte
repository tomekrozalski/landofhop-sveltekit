<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';

	import type { Details } from '$lib/utils/types/Beverage/Details';
	export let details: Details;
	const { badge, brand, name, shortId } = details;

	const basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;
	const pathWebpRegular = `${basicPath}/container/webp/1x/01.webp`;
	const pathWebpLarge = `${basicPath}/container/webp/2x/01.webp`;

	export let loaded: boolean;

	function loadListener(image: HTMLImageElement) {
		image.onload = () => {
			loaded = true;
		};

		image.srcset = image.dataset.srcset as string;
		image.src = image.dataset.src as string;
	}
</script>

<img
	alt={loaded ? `${name.value}, ${brand.name.value}` : ''}
	class:hidden={!loaded}
	data-srcset="{pathWebpRegular} 1x, {pathWebpLarge} 2x"
	data-src={pathWebpRegular}
	use:loadListener
/>

<noscript>
	<img
		alt={loaded ? `${name.value}, ${brand.name.value}` : ''}
		srcset="{pathWebpRegular} 1x, {pathWebpLarge} 2x"
		src={pathWebpRegular}
	/>
</noscript>

<style>
	img {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 220px;
		height: 500px;
	}

	.hidden {
		visibility: hidden;
	}
</style>
