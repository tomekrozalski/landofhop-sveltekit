<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export const prerender = true;

	export async function load({ fetch, params }) {
		const order = +params.order;
		const skip = order * 60 - 60;

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
			pathParams: ['pl', skip, 60]
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
	export let order: number;
	export let beverages: Basics[];
	export let total: number;

	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import Pagination from '$lib/components/beverageList/pagination.svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';
</script>

<svelte:head>
	<title>Land of Hop, 📄 {order}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<BeverageList {beverages} />
<Pagination {order} {total} />
