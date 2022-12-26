<script lang="ts">
	import { page } from '$app/stores';
	import type { BrandPlaceData } from '../types.d';
	import Map from './Map/Map.svelte';
	import Legend from './Legend/Legend.svelte';
	import formatPlaces from './formatPlaces';

	const mapData: BrandPlaceData[] = $page.data.mapData ?? [];
	const formattedPlaces = formatPlaces(mapData);

	let selectedPlace: string | null = null;

	const selectPlace = (value: string) => {
		selectedPlace = value;
	};

	const unselectPlace = () => {
		selectedPlace = null;
	};
</script>

<section>
	<h4>Miejsca związane z marką</h4>
	<div>
		<Map {formattedPlaces} {selectPlace} {selectedPlace} {unselectPlace} />
		<Legend {formattedPlaces} {selectPlace} {selectedPlace} {unselectPlace} />
	</div>
</section>

<style>
	div {
		display: flex;
	}
</style>
