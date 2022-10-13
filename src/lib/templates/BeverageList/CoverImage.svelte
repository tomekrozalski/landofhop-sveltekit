<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import type { Beverage } from './Beverage.d';

	export let beverage: Beverage;
	export let eager: boolean;
	export let loaded: boolean;

	$: getPath = (size: 1 | 2) => {
		const basicPath = `${PHOTO_SERVER}/${beverage.brand.badge}/${beverage.badge}/${beverage.shortId}`;
		return `${basicPath}/cover/webp/${size}x.webp`;
	};

	function loadListener(image: HTMLImageElement) {
		image.onload = () => {
			loaded = true;
		};
	}
</script>

<img
	alt={loaded || eager ? `${beverage.name.value}, ${beverage.brand.name.value}` : ''}
	srcset="{getPath(1)} 1x, {getPath(2)} 2x"
	src={getPath(1)}
	class:loaded
	use:loadListener
	loading={eager ? 'eager' : 'lazy'}
/>

<style>
	img {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		color: transparent;
	}
</style>
