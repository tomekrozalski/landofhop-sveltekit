<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

	export async function load({ fetch, page }) {
		const { brand, name, shortId } = page.params;

		const augmentedBeverageDetails: AugmentedDetails = await serverCall(
			fetch,
			Endpoints.beverageDetails,
			{
				pathParams: ['pl', shortId, brand, name]
			}
		);

		return { props: augmentedBeverageDetails };
	}
</script>

<script lang="ts">
	import {
		beverage as beverageStore,
		next as nextStore,
		previous as previousStore
	} from '$lib/utils/stores/beverage';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import BeverageDetails from '$lib/components/beverageDetails/beverageDetails.svelte';

	export let details: Details;
	export let next: Basics | null;
	export let previous: Basics | null;

	let prevDetails = null;
	$: if (prevDetails?.id !== details.id) {
		beverageStore.set(details);
		prevDetails = details;
	}

	let prevNext = null;
	$: if (prevNext?.id !== next.id) {
		nextStore.set(next);
		prevNext = next;
	}

	let prevPrevious = null;
	$: if (prevPrevious?.id !== previous.id) {
		previousStore.set(previous);
		prevPrevious = previous;
	}
</script>

<svelte:head>
	<title>🍻 {details.brand.name.value}, {details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<BeverageDetails />
