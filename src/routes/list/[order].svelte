<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export async function load({ fetch, page }) {
		const order = +page.params.order;
		const skip = order * 60 - 60;

		/*
			@ToDo:
				it should be moved to API, when we will try
				to get beverages which are out of scope, we
				should response with error
		*/

		if (order === 1) {
			return {
				status: 301,
				redirect: '/'
			};
		}

		const total: number = await serverCall(fetch, Endpoints.beverageTotal);

		if (skip > total) {
			return {
				status: 404,
				error: 'Not found. List order is too high'
			};
		}

		const beverages: Basics[] = await serverCall(fetch, Endpoints.beverageBasics, {
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
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import Pagination from '$lib/components/beverageList/pagination.svelte';

	export let order: number;
	export let beverages: Basics[];
	export let total: number;
</script>

<svelte:head>
	<title>Land of Hop, 📄 {order}</title>
</svelte:head>

<BeverageList {beverages} />
<Pagination {order} {total} />
