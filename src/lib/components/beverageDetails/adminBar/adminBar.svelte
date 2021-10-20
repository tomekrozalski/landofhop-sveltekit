<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import { goto } from '$app/navigation';

	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Button from '$lib/elements/form/button.svelte';
	import InlineSpinner from '$lib/elements/inlineSpinner.svelte';
	import Notes from './notes.svelte';
	import Updated from './updated.svelte';
	import RemoveBeverage from './removeButton.svelte';

	export let details: Details;
	const params = `${details.shortId}/${details.brand.badge}/${details.badge}`;
	let isLoading = true;
	let notes = '';
	let updated = '';

	onMount(async () => {
		const { badge, brand, shortId } = details;

		const adminData: { notes?: string; updated?: string } = await serverCall(
			fetch,
			Endpoints.beverageAdminNotes,
			{ pathParams: ['pl', shortId, brand.badge, badge] }
		);

		if (adminData.notes) {
			notes = adminData.notes;
		}

		if (adminData.updated) {
			updated = adminData.updated;
		}

		isLoading = false;
	});

	function updateBeverage() {
		goto(`/dashboard/update-beverage/${params}`);
	}

	function updateBeverageImages() {
		goto(`/dashboard/update-beverage-photos/${params}`);
	}
</script>

<div class="buttons">
	<Button handleClick={updateBeverage}>{$translate('beverage.adminBar.updateContent')}</Button>
	<Button handleClick={updateBeverageImages}>{$translate('beverage.adminBar.updateImages')}</Button>
	<RemoveBeverage {details} />
</div>

<div class="adminNotes">
	{#if isLoading}
		<InlineSpinner />
	{:else}
		{#if notes}<Notes {notes} />{/if}
		{#if updated}<Updated {updated} />{/if}
	{/if}
</div>

<style>
	.buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.adminNotes {
		margin: 2rem 0;
	}

	.adminNotes :global(p) {
		margin: 0.6rem 0;
	}
</style>
