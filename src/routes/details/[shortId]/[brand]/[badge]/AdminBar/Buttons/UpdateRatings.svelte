<script lang="ts">
	import { translate } from 'svelte-intl';
	import { invalidate } from '$app/navigation';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { AdminNotes } from '$lib/utils/types/Beverage/AdminNotes.d';
	import { postJsonData } from '$lib/utils/api/communication';
	import Button from '$lib/elements/form/Button.svelte';

	export let adminData: AdminNotes;
	export let details: Details;
	let isLoading = false;

	async function updateBeverageRatings() {
		isLoading = true;

		await postJsonData({
			path: '/api/admin/beverages/updateRatings',
			data: {
				...(adminData.ratings.rateBeer && { rateBeerId: adminData.ratings.rateBeer }),
				...(adminData.ratings.untappd && { untappdBeverageSlug: adminData.ratings.untappd }),
				beverageShortId: details.shortId
			}
		});

		await invalidate(`/api/beverages/details/pl/${details.shortId}`);
		isLoading = false;
	}
</script>

<Button handleClick={updateBeverageRatings} isSubmitting={isLoading}>
	{$translate('beverage.adminBar.updateRatings')}
</Button>
