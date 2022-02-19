<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

	export const prerender = true;

	export async function load({ fetch, params }) {
		const augmentedBeverageDetails: AugmentedDetails = await serverCall(
			fetch,
			Endpoints.beverageDetails,
			{ pathParams: ['pl', params.shortId] }
		);

		return { props: augmentedBeverageDetails };
	}
</script>

<script lang="ts">
	import { translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/beverage.json';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { LinkData } from '$lib/utils/types/Beverage/LinkData';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import BeverageDetails from '$lib/components/beverageDetails/beverageDetails.svelte';

	translations.update(dictionary);

	export let details: Details;
	export let next: LinkData | null;
	export let previous: LinkData | null;
</script>

<svelte:head>
	<title>🍻 {details.brand.name.value}, {details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

{#key details.shortId}
	<BeverageDetails {details} {next} {previous} />
{/key}
