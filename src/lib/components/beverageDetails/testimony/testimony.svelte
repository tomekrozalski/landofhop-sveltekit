<script lang="ts">
	import Barcode from './barcode.svelte';
	import BeverageType from './beverageType.svelte';
	import City from './city.svelte';
	import Country from './country.svelte';
	import Fermentation from './fermentation.svelte';
</script>

<dl>
	<City />
	<Country />
	<Barcode />
	<BeverageType />
	<Fermentation />
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
</style>
