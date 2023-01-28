<script lang="ts">
	import { translate } from 'svelte-intl';
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { PUBLIC_MAPBOX_KEY } from '$env/static/public';
	import Edit from './Edit.svelte';
	import type { Place } from './types.d';

	export let places: Place[];
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

<Map
	accessToken={PUBLIC_MAPBOX_KEY}
	center={[18.8, 52]}
	on:ready={() => console.log('inline ready event...')}
	options={{ projection: { name: 'mercator' } }}
	style="mapbox://styles/mapbox/light-v11"
	zoom={5}
>
	{#each places as { shortId, coordinates, institution }}
		{#if coordinates}
			<Marker lat={coordinates[0]} lng={coordinates[1]} color="var(--color-brand-3)">
				<div slot="popup">
					<a href="/brand/{institution.shortId}/{institution.badge}">{institution.name.value}</a>
					<Edit {shortId} />
				</div>
			</Marker>
		{/if}
	{/each}
</Map>

<style>
	:global(.mapboxgl-ctrl-bottom-right) {
		display: none;
	}
</style>
