<script lang="ts">
	import { translate } from 'svelte-intl';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import type { AdminData } from '../AdminData.d';

	export let adminData: AdminData | null;
	let isLoading = false;
	$: ({ badge, brand, shortId } = $page.data.details);

	async function updateBeverageRatings() {
		if (adminData?.ratings) {
			isLoading = true;

			const data = {
				...(adminData.ratings.rateBeer && { rateBeerId: adminData.ratings.rateBeer }),
				...(adminData.ratings.untappd && { untappdBeverageSlug: adminData.ratings.untappd }),
				beverageShortId: shortId
			};

			await fetch(`/details/${shortId}/${brand.badge}/${badge}/api/updateRatings`, {
				method: 'POST',
				body: JSON.stringify(data)
			});

			await invalidateAll();
			isLoading = false;
		}
	}
</script>

{#if adminData?.ratings}
	<Button handleClick={updateBeverageRatings} isSubmitting={isLoading}>
		{$translate('beverage.adminBar.updateRatings')}
	</Button>
{/if}
