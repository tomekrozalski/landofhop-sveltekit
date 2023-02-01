<script lang="ts">
	import { translate } from 'svelte-intl';
	import { Marker } from '@beyonk/svelte-mapbox';
	import Edit from './Edit.svelte';
	import type { Place } from './types.d';

	export let data: Place;
	let { city, coordinates, institution, shortId } = data;
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

{#if coordinates}
	<Marker lat={coordinates[0]} lng={coordinates[1]} color="var(--color-brand-3)">
		<div class="popup" slot="popup">
			<a href="/brand/{institution.shortId}/{institution.badge}">{institution.name.value}</a>, {city.value}
			<Edit {shortId} />
		</div>
	</Marker>
{/if}

<style>
	:global(.mapboxgl-popup-content) {
		padding: 0.8rem 2rem 0.8rem 1.5rem !important;
		box-shadow: none !important;
		border-radius: 0 !important;
		border: 0.1rem solid var(--color-black);
		transform: translateY(-1rem);
	}

	:global(.mapboxgl-popup-tip) {
		border: 0 !important;
		transform: translateY(-1rem);
	}

	:global(.mapboxgl-popup-tip::before),
	:global(.mapboxgl-popup-tip::after) {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: 0;
	}

	:global(.mapboxgl-popup-tip::before) {
		z-index: 2;
	}

	:global(.mapboxgl-popup-tip::after) {
		z-index: 1;
	}

	:global(.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip::before) {
		border-top: 1rem solid var(--color-white);
		border-right: 1rem solid transparent;
		border-left: 1rem solid transparent;
		transform: translate(-50%, -1px);
	}

	:global(.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip::after) {
		border-top: 1rem solid var(--color-black);
		border-right: 1rem solid transparent;
		border-left: 1rem solid transparent;
		transform: translate(-50%, 0);
	}

	:global(.mapboxgl-popup-anchor-right .mapboxgl-popup-tip::before) {
		border-top: 1rem solid transparent;
		border-bottom: 1rem solid transparent;
		border-left: 1rem solid var(--color-white);
		transform: translate(-1px, -50%);
	}

	:global(.mapboxgl-popup-anchor-right .mapboxgl-popup-tip::after) {
		border-top: 1rem solid transparent;
		border-bottom: 1rem solid transparent;
		border-left: 1rem solid var(--color-black);
		transform: translate(0, -50%);
	}

	:global(.mapboxgl-popup-anchor-left .mapboxgl-popup-tip::before) {
		border-top: 1rem solid transparent;
		border-right: 1rem solid var(--color-white);
		border-bottom: 1rem solid transparent;
		transform: translate(calc(-100% + 1px), -50%);
	}

	:global(.mapboxgl-popup-anchor-left .mapboxgl-popup-tip::after) {
		border-top: 1rem solid transparent;
		border-right: 1rem solid var(--color-black);
		border-bottom: 1rem solid transparent;
		transform: translate(-100%, -50%);
	}

	:global(.mapboxgl-popup-anchor-top .mapboxgl-popup-tip::before) {
		border-right: 1rem solid transparent;
		border-bottom: 1rem solid var(--color-white);
		border-left: 1rem solid transparent;
		transform: translate(-50%, calc(-100% + 1px));
	}

	:global(.mapboxgl-popup-anchor-top .mapboxgl-popup-tip::after) {
		border-right: 1rem solid transparent;
		border-bottom: 1rem solid var(--color-black);
		border-left: 1rem solid transparent;
		transform: translate(-50%, -100%);
	}

	.popup a {
		color: var(--color-brand-10);
	}

	.popup a:hover {
		text-decoration: underline;
	}

	.popup a:focus {
		outline: none;
	}
</style>
