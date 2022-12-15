<script lang="ts">
	import { onMount } from 'svelte';
	import { geoMercator, geoPath } from 'd3-geo';
	import { page } from '$app/stores';
	import pl from './wojewodztwa-medium.json';
	import type { BrandPlaceData } from '../types.d';

	const projection = geoMercator().scale(2240).translate([-490, 2600]);
	const pathGenerator = geoPath(projection);

	const timelineData: BrandPlaceData[] = $page.data.mapData ?? [];

	console.log('timelineData', timelineData);

	// const bum = projection([17.0203977, 51.1244591]);
</script>

<!-- <canvas
	width={960 * pixelRatio}
	height={600 * pixelRatio}
	bind:this={canvas}
	style:width="960px"
	style:height="600px"
/> -->

<svg viewBox="0 0 500 400">
	{#each pl.features as country}
		<path d={pathGenerator(country)} />
	{/each}
	{#each timelineData as place}
		{@const [latitude, longitude] = projection([place.coordinates[1], place.coordinates[0]])}
		<g style="transform: translate(-5px, -5px)">
			<rect x={latitude} y={longitude} width="10" height="10" rx="5" />
		</g>
	{/each}
</svg>

<style>
	svg {
		border: 1px solid #333;
	}

	path {
		fill: #ccc;
		stroke-width: 0.05rem;
		stroke: #eee;
	}
</style>
