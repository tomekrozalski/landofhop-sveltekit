<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { page } from '$app/stores';
	import pl from './wojewodztwa-medium.json';
	import type { BrandPlaceData } from '../types.d';
	import Beverages from './Beverages.svelte';
	import Contractor from './Contractor.svelte';
	import Cooperator from './Cooperator.svelte';

	const projection = geoMercator().scale(520).translate([-123, 606]);
	const pathGenerator = geoPath(projection);

	const mapData: BrandPlaceData[] = $page.data.mapData ?? [];

	console.log('mapData', mapData);
</script>

<svg viewBox="0 0 100 100">
	{#each pl.features as country}
		<path d={pathGenerator(country)} />
	{/each}
	{#each mapData as data}
		<Beverages {data} {projection} />
		<Cooperator {data} {projection} />
		<Contractor {data} {projection} />
	{/each}
</svg>

<style>
	svg {
		width: 30rem;
		height: 30rem;
	}

	path {
		fill: var(--color-grey-4);
		stroke-width: 0.025rem;
		stroke: var(--color-white);
	}
</style>
