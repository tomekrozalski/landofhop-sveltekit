<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { PUBLIC_MAPBOX_KEY } from '$env/static/public';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		mapboxgl.accessToken = PUBLIC_MAPBOX_KEY;

		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v11',
			center: [18.8, 52],
			projection: { name: 'mercator' },
			zoom: 5
		});

		data.formattedPlaces.forEach(({ shortId, latitude, longitude }) => {
			const popup = new mapboxgl.Popup({ offset: 25 }).setText('->' + shortId);

			new mapboxgl.Marker().setLngLat([longitude, latitude]).setPopup(popup).addTo(map);
		});
	});
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('places.title')}</h1>
	<div id="map">
		<Spinner />
	</div>
</article>

<style>
	div {
		height: 60rem;
		position: relative;
		background-color: var(--color-grey-4);
		z-index: 1;
	}

	div :global(.lds-ellipsis) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: -1;
	}

	div :global(.mapboxgl-ctrl-bottom-right) {
		display: none;
	}
</style>
