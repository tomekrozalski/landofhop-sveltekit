<script context="module" lang="ts">
	import { BEVERAGES_ON_PAGE } from '$lib/utils/constants';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export const prerender = true;

	export async function load({ fetch, params }) {
		const order = +params.order;
		const skip = order * BEVERAGES_ON_PAGE - BEVERAGES_ON_PAGE;

		if (!order || order === 1) {
			return {
				status: 301,
				redirect: '/'
			};
		}

		const total: number = await apiCall(fetch, Endpoints.beverageTotal);

		if (skip > total) {
			return {
				status: 404,
				error: 'Not found. List order is too high'
			};
		}

		const beverages: any = await apiCall(fetch, Endpoints.beverageBasics, {
			pathParams: ['pl', skip, BEVERAGES_ON_PAGE]
		});

		return {
			props: {
				order,
				beverages,
				total
			}
		};
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/landingPage.json';

	export let order: number;
	export let beverages: Basics[];
	export let total: number;

	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import Pagination from '$lib/components/beverageList/pagination/pagination.svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	translations.update(dictionary);
</script>

<svelte:head>
	<title>Land of Hop, 📄 {order}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('landingPage.breadcrumbs', { order }) }]} />
<BeverageList {beverages} />
<Pagination {order} {total} />
