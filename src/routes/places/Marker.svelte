<script lang="ts">
	import { translate } from 'svelte-intl';
	import { Marker } from '@beyonk/svelte-mapbox';
	import Edit from './Edit.svelte';
	import type { Place } from './types.d';

	export let data: Place;
	let { city, coordinates, country, institution, shortId } = data;
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

{#if coordinates}
	<Marker lat={coordinates[0]} lng={coordinates[1]} color="var(--color-brand-3)">
		<div slot="popup">
			{city.value} ({country})<br />
			<a href="/brand/{institution.shortId}/{institution.badge}">{institution.name.value}</a>
			<Edit {shortId} />
		</div>
	</Marker>
{/if}
