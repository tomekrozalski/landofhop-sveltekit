<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export async function load({ fetch }) {
		const total: number = await serverCall(fetch, Endpoints.beverageTotal);
		const beverages: Basics[] = await serverCall(fetch, Endpoints.beverageBasics, {
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
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import Pagination from '$lib/components/beverageList/pagination.svelte';

	export let beverages: Basics[];
	export let total: number;
</script>

<svelte:head>
	<title>Land of Hop</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<BeverageList {beverages} />
<Pagination order={1} {total} />
