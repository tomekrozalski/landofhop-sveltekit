<script lang="ts">
	import { translate } from 'svelte-intl';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import type { Details } from 'src/oldTypes/Beverage/Details';
	import type { AdminNotes } from 'src/oldTypes/Beverage/AdminNotes';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import Remove from './Remove.svelte';
	import UpdateRatings from './UpdateRatings.svelte';

	export let adminData: AdminNotes;
	export let details: Details;
	const params = `${details.shortId}/${details.brand.badge}/${details.badge}`;

	function updateBeverage() {
		goto(`/dashboard/update-beverage/${params}`);
	}

	function updateBeverageImages() {
		goto(`/dashboard/update-beverage-photos/${params}`);
	}
</script>

<div class="buttons" in:fade>
	<Button handleClick={updateBeverage}>{$translate('beverage.adminBar.updateContent')}</Button>
	<Button handleClick={updateBeverageImages}>{$translate('beverage.adminBar.updateImages')}</Button>
	{#if adminData.ratings}
		<UpdateRatings {adminData} {details} />
	{/if}
	<Remove {details} />
</div>

<style>
	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	@media (--xl) {
		.buttons {
			flex-direction: row;
		}
	}
</style>
