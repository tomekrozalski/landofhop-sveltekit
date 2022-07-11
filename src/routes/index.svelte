<script context="module" lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export const prerender = true;

	export async function load({ fetch }) {
		const [total, beverages]: [number, Basics[]] = await Promise.all([
			apiCall(fetch, Endpoints.beverageTotal),
			apiCall(fetch, Endpoints.beverageBasics, {
				pathParams: ['pl', 0, BEVERAGES_ON_PAGE]
			})
		]);

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
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BeverageList from '$lib/components/BeverageList/BeverageList.svelte';
	import Pagination from '$lib/components/BeverageList/Pagination/pagination.svelte';
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

<Breadcrumbs steps={[{ label: $translate('landingPage.breadcrumbs', { order: 1 }) }]} />
<BeverageList {beverages} />
<Pagination order={1} {total} />
