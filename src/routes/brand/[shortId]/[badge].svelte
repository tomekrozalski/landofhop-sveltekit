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
	import { translate, translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/brand.json';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	translations.update(dictionary);

	export let data;
</script>

<svelte:head>
	<title>{$translate('brand.title', { name: data.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<h1>{data.name.value}</h1>
	<div>{JSON.stringify(data, null, '\n')}</div>
</article>
