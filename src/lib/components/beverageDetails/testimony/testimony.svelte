<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Barcode from './barcode.svelte';
	import BeverageType from './beverageType.svelte';
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
	import SmokedMalt from './smokedMalt.svelte';
	import Temperature from './temperature.svelte';
	import Container from './container.svelte';
	import Price from './price.svelte';

	export let details: Details;
</script>

<dl>
	<City {details} />
	<Country {details} />
	<Barcode {details} />
	<BeverageType {details} />
	<Fermentation {details} />
	<Extract {details} />
	<Alcohol {details} />
	<Filtration {details} />
	<Pasteurization {details} />
	<Aged {details} />
	<BeverageStyle {details} />
	<DryHopped {details} />
	<HopRate {details} />
	<ExpirationTime {details} />
	<Ingredients {details} />
	<SmokedMalt {details} />
	<Temperature {details} />
	<Container {details} />
	<Price {details} />
</dl>
