<script lang="ts">
	import { translate } from 'svelte-intl';
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { PUBLIC_MAPBOX_KEY } from '$env/static/public';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import type { PageData } from './$types';
	import AddNewPlace from '$lib/templates/modals/AddNewPlace/AddNewPlace.svelte';

	export let data: PageData;

	let isModalOpen = false;

	const ha = () => {
		console.log('ha');
		isModalOpen = true;
	};
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('places.title')}</h1>

	<Map
		accessToken={PUBLIC_MAPBOX_KEY}
		center={[18.8, 52]}
		on:ready={() => console.log('inline ready event...')}
		style="mapbox://styles/mapbox/light-v11"
		zoom={5}
	>
		{#each data.formattedPlaces as { shortId, location, institution }}
			{#if location}
				<Marker lat={location[0]} lng={location[1]} color="coral">
					<div slot="popup">
						<a href="/brand/{institution.shortId}/{institution.badge}">{institution.name.value}</a>
						<button on:click={ha}>edytuj</button>
					</div>
				</Marker>
			{/if}
		{/each}
	</Map>
	{#if isModalOpen}
		<AddNewPlace close={() => (isModalOpen = false)} />
	{/if}

	<!-- <div id="map">
		<Spinner />
	</div> -->
</article>

<style>
	/* div {
		position: relative;
		background-color: var(--color-grey-4);
		z-index: 1;
	} */

	article :global(.mapboxgl-map) {
		height: 60rem;
	}

	/* div :global(.lds-ellipsis) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: -1;
	} */

	article :global(.mapboxgl-ctrl-bottom-right) {
		display: none;
	}
</style>
