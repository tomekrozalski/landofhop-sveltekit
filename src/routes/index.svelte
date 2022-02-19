<script context="module" lang="ts">
	import { browser, dev } from '$app/env';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export const hydrate = dev;
	export const router = browser;
	export const prerender = true;

	export async function load({ fetch }) {
		const total: number = await apiCall(fetch, Endpoints.beverageTotal);
		const beverages: any = await apiCall(fetch, Endpoints.beverageBasics, {
			pathParams: ['pl', 0, 60]
		});

		return {
			props: {
				beverages,
				total
			}
		};
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/landingPage.json';
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import Pagination from '$lib/components/beverageList/pagination.svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let beverages: Basics[];
	export let total: number;

	translations.update(dictionary);
</script>

<svelte:head>
	<title>Land of Hop</title>
	<meta name="description" content={$translate('landingPage.description')} />
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<BeverageList {beverages} />
<Pagination order={1} {total} />
