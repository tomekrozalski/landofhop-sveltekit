<script lang="ts">
	import { translate } from 'svelte-intl';
	import Spinner from '$lib/atoms/spinners/FullWidth.svelte';
	import Map from './Map.svelte';

	export let data;
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('places.title')}</h1>
	<div>
		<Map places={data.places} />
		<Spinner />
	</div>
</article>

<style>
	div {
		height: 60rem;
		background-color: var(--color-grey-5);
		position: relative;
		z-index: 1;
	}

	div :global(.lds-ellipsis) {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}
</style>
