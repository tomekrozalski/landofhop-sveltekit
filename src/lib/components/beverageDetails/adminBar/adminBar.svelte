<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Button from '$lib/elements/form/button.svelte';
	import Notes from './notes.svelte';

	export let details: Details;

	function updateBeverage() {
		// push({
		//     pathname: '/update-beverage',
		//     query: { id: details.id },
		//   })
		//
		console.log('updateBeverage');
	}

	function updateBeverageImages() {
		// () => push('/update-beverage-images')

		console.log('updateBeverageImages');
	}
</script>

<div>
	<Button handleClick={updateBeverage}>{$translate('beverage.adminBar.updateContent')}</Button>
	<Button handleClick={updateBeverageImages}>{$translate('beverage.adminBar.updateImages')}</Button>
	<!-- <RemoveBeverage details={details} /> -->
</div>
<Notes {details} />

<style>
	div {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}
</style>
