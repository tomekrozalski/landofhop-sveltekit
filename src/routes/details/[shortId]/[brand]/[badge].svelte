<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

	// export const prerender = true;

	export async function load({ fetch, params }) {
		try {
			const augmentedBeverageDetails: AugmentedDetails = await apiCall(
				fetch,
				Endpoints.beverageDetails,
				{
					pathParams: ['pl', params.shortId]
				}
			);

			return { props: augmentedBeverageDetails };
		} catch (e) {
			return {
				status: 404,
				error: e.message
			};
		}
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/beverage.json';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import type { LinkData } from '$lib/utils/types/Beverage/LinkData';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BeverageDetails from '$lib/components/BeverageDetails/BeverageDetails.svelte';

	translations.update(dictionary);

	export let listPage: number;
	export let details: Details;
	export let next: LinkData | null;
	export let previous: LinkData | null;
</script>

<svelte:head>
	<title>🍻 {details.brand.name.value}, {details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

{#if details}
	{#key details.shortId}
		<Breadcrumbs
			steps={[
				{
					label: $translate('beverage.breadcrumbs.list', { listPage }),
					link: `/list/${listPage}`
				},
				{
					label: $translate('beverage.breadcrumbs.details')
				}
			]}
		/>
		<BeverageDetails {details} {next} {previous} />
	{/key}
{/if}
