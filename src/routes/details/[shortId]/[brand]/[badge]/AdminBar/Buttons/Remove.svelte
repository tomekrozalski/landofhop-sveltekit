<script lang="ts">
	import { translate } from 'svelte-intl';
	import { goto } from '$app/navigation';
	import { deleteJsonData } from '$lib/utils/api/communication';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import type { Details } from 'src/oldTypes/Beverage/Details';

	export let details: Details;
	let confirmed = false;
	let isSubmitting = false;

	function removeBeverage() {
		isSubmitting = true;

		setTimeout(() => {
			isSubmitting = false;
			confirmed = true;
		}, 3000);
	}

	async function confirm() {
		isSubmitting = true;

		try {
			await deleteJsonData({
				path: `/api/admin/beverages/remove/${details.shortId}`
			});

			goto('/');
		} catch (err) {
			isSubmitting = false;
			console.warn(err);
		}
	}
</script>

<Button
	handleClick={confirmed ? confirm : removeBeverage}
	isSecondary={!confirmed}
	isWarning={confirmed}
	{isSubmitting}
>
	{#if confirmed}
		{$translate('beverage.adminBar.areYouSure')}
	{:else}
		{$translate('beverage.adminBar.removeBeverage')}
	{/if}
</Button>
