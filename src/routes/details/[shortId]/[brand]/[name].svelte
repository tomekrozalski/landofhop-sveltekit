<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

	export async function load({ fetch, page }) {
		const { brand, name, shortId } = page.params;

		const beverageDetails: AugmentedDetails = await serverCall(fetch, Endpoints.beverageDetails, {
			pathParams: ['pl', shortId, brand, name]
		});

		return { props: beverageDetails };
	}
</script>

<script lang="ts">
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export let details: Details;
	export let next: Basics | null;
	export let previous: Basics | null;

	// import BeverageList from '$lib/components/beverageList/beverageList.svelte';

	console.log('->', details, next, previous);
</script>

<div>details page: <strong>{details.badge}</strong></div>
