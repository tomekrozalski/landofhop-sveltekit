<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { page } from '$app/stores';
	import pl from './wojewodztwa-medium.json';
	import type { BrandPlaceData } from '../types.d';
	import Cicle from './Circle.svelte';
	import getCircleSize from './getCircleSize';

	const projection = geoMercator().scale(520).translate([-123, 606]);
	const pathGenerator = geoPath(projection);

	const mapData: BrandPlaceData[] = $page.data.mapData ?? [];

	console.log('mapData', mapData);

	const formattedPlaces = mapData
		.map(({ asContractor, asCooperator, beverages, city, coordinates, country, shortId }) => {
			const total = asContractor + asCooperator + beverages;
			const size = getCircleSize(total);
			const cooperationSize = (asCooperator / total) * size;
			const contractorSize = (asContractor / total) * size;
			const beveragesSize = (beverages / total) * size;

			return {
				cooperationCircleData: {
					size,
					stroke: cooperationSize
				},
				contractorCircleData: {
					size: size - cooperationSize,
					stroke: contractorSize
				},
				beverageCircleData: {
					size: size - cooperationSize - contractorSize,
					stroke: beveragesSize
				},
				city,
				coordinates,
				country,
				size,
				shortId
			};
		})
		.sort((a, b) => (a.size > b.size ? -1 : 1));

	console.log('formattedPlaces', formattedPlaces);
</script>

<svg viewBox="0 0 100 100">
	{#each pl.features as country}
		<path d={pathGenerator(country)} />
	{/each}
	{#each formattedPlaces as { cooperationCircleData, contractorCircleData, beverageCircleData, coordinates }}
		{@const geoCoordinates = projection([coordinates[1], coordinates[0]])}
		<g>
			<Cicle {geoCoordinates} data={cooperationCircleData} type="cooperation" />
			<Cicle {geoCoordinates} data={contractorCircleData} type="contract" />
			<Cicle {geoCoordinates} data={beverageCircleData} type="beverages" />
			<Cicle {geoCoordinates} data={beverageCircleData} type="point" />
		</g>
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
