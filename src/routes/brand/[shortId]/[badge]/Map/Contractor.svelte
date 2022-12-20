<script lang="ts">
	import type { GeoProjection } from 'd3-geo';
	import type { BrandPlaceData } from '../types.d';
	import getCircleSize from './getCircleSize';

	export let data: BrandPlaceData;
	export let projection: GeoProjection;

	const { asContractor, coordinates } = data;
	const [latitude, longitude] = projection([coordinates[1], coordinates[0]]) as [number, number];
	const size = getCircleSize(asContractor);
</script>

{#if asContractor}
	<rect
		x={latitude}
		y={longitude}
		width={size}
		height={size}
		rx={size / 2}
		style={`transform: translate(-${size / 2}px, -${size / 2}px)`}
	/>
{/if}

<style>
	rect {
		fill: greenyellow;
		opacity: 0.5;
	}
</style>
