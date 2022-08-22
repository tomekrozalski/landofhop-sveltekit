<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { AugmentedDetails } from '$lib/utils/types/Beverage/AugmentedDetails';

	// export const prerender = true;

	export async function load({ fetch, params }) {
		try {
			const institutionDetails: AugmentedDetails = await apiCall(
				fetch,
				Endpoints.institutionDetails,
				{ pathParams: ['pl', params.shortId] }
			);

			return {
				props: {
					data: institutionDetails
				}
			};
		} catch (e) {
			return {
				status: 404,
				error: e.message
			};
		}
	}
</script>

<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let data;
</script>

<svelte:head>
	<title>🍻 {data.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<h1>test</h1>
<div>{JSON.stringify(data, null, '\n')}</div>
