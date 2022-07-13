<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';

	import type { Details } from '$lib/utils/types/Beverage/Details';
	export let details: Details;
	const { badge, brand, name, shortId } = details;

	const basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;
	const pathWebpRegular = `${basicPath}/container/webp/1x/01.webp`;
	const pathWebpLarge = `${basicPath}/container/webp/2x/01.webp`;

	export let loaded: boolean;

	function loadListener(image) {
		image.onload = () => {
			loaded = true;
		};
	}
</script>

<img
	alt={loaded ? `${name.value}, ${brand.name.value}` : ''}
	srcset="{pathWebpRegular} 1x, {pathWebpLarge} 2x"
	src={pathWebpRegular}
	use:loadListener
/>

<style>
	img {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 220px;
		height: 500px;
	}
</style>
