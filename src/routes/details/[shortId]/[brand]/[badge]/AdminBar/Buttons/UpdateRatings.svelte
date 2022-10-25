<script lang="ts">
	import { translate } from 'svelte-intl';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { postJsonData } from '$lib/utils/api/communication';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import type { AdminData } from '../AdminData.d';

	export let adminData: AdminData | null;
	let isLoading = false;

	async function updateBeverageRatings() {
		if (adminData?.ratings) {
			isLoading = true;

			await postJsonData({
				path: '/api/admin/beverages/updateRatings',
				data: {
					...(adminData.ratings.rateBeer && { rateBeerId: adminData.ratings.rateBeer }),
					...(adminData.ratings.untappd && { untappdBeverageSlug: adminData.ratings.untappd }),
					beverageShortId: $page.data.details.shortId
				}
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
