<script lang="ts">
	import { translate } from 'svelte-intl';
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
	<h2>{$translate('brand.placesTitle')}</h2>
	<div>
		<Map {formattedPlaces} {selectPlace} {selectedPlace} {unselectPlace} />
		<Legend {formattedPlaces} {selectPlace} {selectedPlace} {unselectPlace} />
	</div>
</section>

<style>
	h2 {
		margin-bottom: 0;
		border: none;
	}

	div {
		display: flex;
	}
</style>
