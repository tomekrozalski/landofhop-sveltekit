<script lang="ts">
	import { onMount } from 'svelte';
	import { geoMercator, geoPath } from 'd3-geo';
	import pl from './wojewodztwa-medium.json';

	const projection = geoMercator().scale(2240).translate([-490, 2600]);
	const pathGenerator = geoPath(projection);

	const bum = projection([17.0203977, 51.1244591]);
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
	<g style="transform: translate(-5px, -5px)">
		<rect x={bum[0]} y={bum[1]} width="10" height="10" rx="5" />
	</g>
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
