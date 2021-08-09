<script lang="ts">
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
</script>

<dl>
	<City />
	<Country />
	<Barcode />
	<BeverageType />
	<Fermentation />
	<Extract />
	<Alcohol />
	<Filtration />
	<Pasteurization />
	<Aged />
	<BeverageStyle />
	<DryHopped />
</dl>

<style>
	dl {
		grid-area: testimony;
		margin: 1.8rem 0;
	}

	dl::first-letter {
		text-transform: uppercase;
	}

	:global(dt) {
		display: inline;
	}

	:global(dt::after) {
		content: ': ';
	}

	:global(dd) {
		display: inline-flex;
		margin: 0;
		padding: 0;
	}

	:global(dd:not(:last-of-type)::after) {
		content: ', ';
	}

	:global(dd > * + *:not(.no-separator)::before) {
		content: ' / ';
	}

	:global(dd > * + .no-separator::before) {
		content: ' ';
	}
</style>
