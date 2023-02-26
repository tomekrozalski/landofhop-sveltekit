<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import type { BrandPlaceData } from '../types.d';
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
		<div class="map-wrapper">
			{#await import('./Map/Map.svelte')}
				<Spinner />
			{:then Module}
				<Module.default {formattedPlaces} {selectPlace} {selectedPlace} {unselectPlace} />
			{/await}
		</div>
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

	.map-wrapper {
		display: flex;
		align-items: center;
		width: 30rem;
		height: 30rem;
	}
</style>
