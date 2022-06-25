<script lang="ts">
	import { translate } from 'svelte-intl';
	import { invalidate } from '$app/navigation';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { AdminNotes } from '$lib/utils/types/Beverage/AdminNotes.d';
	import apiCall, { Endpoints, getLink } from '$lib/utils/api/call';
	import Button from '$lib/elements/form/button.svelte';

	export let adminData: AdminNotes;
	export let details: Details;
	let isLoading = false;

	async function updateBeverageRatings() {
		isLoading = true;

		await apiCall(fetch, Endpoints.updateRatings, {
			method: 'POST',
			body: JSON.stringify({
				...(adminData.ratings.rateBeer && { rateBeerId: adminData.ratings.rateBeer }),
				...(adminData.ratings.untappd && { untappdBeverageSlug: adminData.ratings.untappd }),
				beverageShortId: details.shortId
			})
		});

		await invalidate(getLink(Endpoints.beverageDetails, ['pl', details.shortId]));
		isLoading = false;
	}
</script>

<Button handleClick={updateBeverageRatings} isSubmitting={isLoading}>
	{$translate('beverage.adminBar.updateRatings')}
</Button>
