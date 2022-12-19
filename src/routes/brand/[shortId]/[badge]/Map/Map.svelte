<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { page } from '$app/stores';
	import pl from './wojewodztwa-medium.json';
	import type { BrandPlaceData } from '../types.d';

	const projection = geoMercator().scale(2240).translate([-490, 2600]);
	const pathGenerator = geoPath(projection);

	const mapData: BrandPlaceData[] = $page.data.mapData ?? [];

	// console.log('mapData', mapData);
</script>

<svg viewBox="0 0 500 400">
	{#each pl.features as country}
		<path d={pathGenerator(country)} />
	{/each}
	{#each mapData as { asContractor, asCooperator, beverages, coordinates }}
		{@const [latitude, longitude] = projection([coordinates[1], coordinates[0]])}

		{#if asContractor}
			<g style={`transform: translate(-${asContractor / 2}px, -${asContractor / 2}px)`}>
				<rect
					class:asContractor
					x={latitude}
					y={longitude}
					width={asContractor}
					height={asContractor}
					rx={asContractor / 2}
				/>
			</g>
		{/if}

		{#if asCooperator}
			<g style={`transform: translate(-${asCooperator / 2}px, -${asCooperator / 2}px)`}>
				<rect
					class:asCooperator
					x={latitude}
					y={longitude}
					width={asCooperator}
					height={asCooperator}
					rx={asCooperator / 2}
				/>
			</g>
		{/if}

		{#if beverages}
			<g style={`transform: translate(-${beverages / 2}px, -${beverages / 2}px)`}>
				<rect
					class:beverages
					x={latitude}
					y={longitude}
					width={beverages}
					height={beverages}
					rx={beverages / 2}
				/>
			</g>
		{/if}
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

	g {
		opacity: 0.2;
	}

	rect.beverages {
		fill: blue;
	}
</style>
