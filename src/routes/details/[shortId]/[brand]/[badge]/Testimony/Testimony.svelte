<script lang="ts">
	import Barcode from './Barcode.svelte';
	import City from './City.svelte';
	import Country from './Country.svelte';
	import Fermentation from './Fermentation.svelte';
	import Extract from './Extract.svelte';
	import Alcohol from './Alcohol.svelte';
	import Filtration from './Filtration.svelte';
	import Pasteurization from './Pasteurization.svelte';
	import Aged from './Aged/Aged.svelte';
	import BeverageStyle from './BeverageStyle.svelte';
	import DryHopped from './DryHopped.svelte';
	import HopRate from './HopRate.svelte';
	import ExpirationTime from './ExpirationTime.svelte';
	import Ingredients from './Ingredients.svelte';
	import IngredientTags from './IngredientTags.svelte';
	import Nitrogen from './Nitrogen.svelte';
	import SmokedMalt from './SmokedMalt.svelte';
	import StyleTags from './StyleTags.svelte';
	import Temperature from './Temperature.svelte';
	import Container from './Container.svelte';
	import Price from './Price.svelte';
</script>

<dl>
	<City />
	<Country />
	<Barcode />
	<Fermentation />
	<Extract />
	<Alcohol />
	<Filtration />
	<Pasteurization />
	<Aged />
	<BeverageStyle />
	<StyleTags />
	<DryHopped />
	<HopRate />
	<Nitrogen />
	<ExpirationTime />
	<Ingredients />
	<IngredientTags />
	<SmokedMalt />
	<Temperature />
	<Container />
	<Price />
</dl>

<style>
	dl {
		grid-area: testimony;
		display: grid;
		grid-template-columns: 1fr;
		margin: 3rem 0 1.8rem 0;
	}

	dl :global(dt::after) {
		content: ':';
	}

	dl :global(dd) {
		margin-bottom: 1rem;
	}

	@media (min-width: 1024px) {
		dl {
			grid-template-columns: 1fr 2fr;
			grid-column-gap: 2rem;
		}

		dl :global(dt) {
			white-space: nowrap;
			text-align: right;
		}

		dl :global(dd) {
			margin-bottom: 0;
		}
	}
</style>
