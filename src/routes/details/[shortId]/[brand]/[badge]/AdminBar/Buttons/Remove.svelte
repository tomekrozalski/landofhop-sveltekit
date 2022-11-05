<script lang="ts">
	import { translate } from 'svelte-intl';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/atoms/forms/Button/Button.svelte';

	let confirmed = false;
	let isSubmitting = false;
	$: ({ badge, brand, shortId } = $page.data.details);

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
			await fetch(`/details/${shortId}/${brand.badge}/${badge}/api/remove`, {
				method: 'DELETE'
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
