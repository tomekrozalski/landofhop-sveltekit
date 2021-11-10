<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Barcode from './barcode.svelte';
	import City from './city.svelte';
	import Country from './country.svelte';
	import Fermentation from './fermentation.svelte';
	import Extract from './extract.svelte';
	import Alcohol from './alcohol.svelte';
	import Filtration from './filtration.svelte';
	import Pasteurization from './pasteurization.svelte';
	import Aged from './aged/aged.svelte';
	import BeverageStyle from './beverageStyle.svelte';
	import DryHopped from './dryHopped.svelte';
	import HopRate from './hopRate.svelte';
	import ExpirationTime from './expirationTime.svelte';
	import Ingredients from './ingredients.svelte';
	import Nitrogen from './nitrogen.svelte';
	import SmokedMalt from './smokedMalt.svelte';
	import StyleTags from './styleTags.svelte';
	import Temperature from './temperature.svelte';
	import Container from './container.svelte';
	import Price from './price.svelte';

	export let details: Details;
</script>

<dl>
	<City {details} />
	<Country {details} />
	<Barcode {details} />
	<Fermentation {details} />
	<Extract {details} />
	<Alcohol {details} />
	<Filtration {details} />
	<Pasteurization {details} />
	<Aged {details} />
	<BeverageStyle {details} />
	<StyleTags {details} />
	<DryHopped {details} />
	<HopRate {details} />
	<Nitrogen {details} />
	<ExpirationTime {details} />
	<Ingredients {details} />
	<SmokedMalt {details} />
	<Temperature {details} />
	<Container {details} />
	<Price {details} />
</dl>

<style>
	dl {
		grid-area: testimony;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-column-gap: 2rem;
		margin: 3rem 0 1.8rem 0;
	}

	dl :global(dt) {
		text-align: right;
		white-space: nowrap;
	}

	dl :global(dt::after) {
		content: ':';
	}
</style>
