<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import type { FormattedPlaceData } from '../../types.d';
	import pl from './wojewodztwa-medium.json'; // @ToDo: 1.4MB!
	import Cicle from './Circle.svelte';
	import Point from './Point.svelte';

	export let formattedPlaces: FormattedPlaceData[];
	export let selectedPlace: string | null;
	export let selectPlace: (value: string) => void;
	export let unselectPlace: () => void;

	const projection = geoMercator().scale(520).translate([-123, 606]);
	const pathGenerator = geoPath(projection);
</script>

<svg viewBox="0 0 100 100">
	{#each pl.features as country}
		<path d={pathGenerator(country)} />
	{/each}
	{#each formattedPlaces as { cooperationCircleData, contractorCircleData, beverageCircleData, coordinates, shortId }}
		{@const geoCoordinates = projection([coordinates[1], coordinates[0]])}
		<g
			class:selectedGroup={selectedPlace === shortId}
			on:mouseenter={() => selectPlace(shortId)}
			on:mouseleave={unselectPlace}
		>
			<Cicle {geoCoordinates} data={cooperationCircleData} type="cooperation" />
			<Cicle {geoCoordinates} data={contractorCircleData} type="contract" />
			<Cicle {geoCoordinates} data={beverageCircleData} type="beverages" />
			<Point {geoCoordinates} />
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

	g {
		cursor: pointer;
	}

	g :global(circle) {
		opacity: 0.5;
		transition: opacity var(--transition-default);
	}

	g:hover :global(circle),
	g.selectedGroup :global(circle) {
		opacity: 1;
	}
</style>
