<script lang="ts">
	import { translate } from 'svelte-intl';
	import { goto } from '$app/navigation';

	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import Button from '$lib/elements/form/button.svelte';
	import type { Details } from '$lib/utils/types/Beverage/Details';

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
			await serverCall(fetch, Endpoints.beverageRemove, {
				method: 'DELETE',
				pathParams: [details.shortId]
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
