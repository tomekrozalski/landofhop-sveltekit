<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export async function load() {
		const total: number = await serverCall(Endpoints.beverageTotal);
		const beverages: Basics[] = await serverCall(Endpoints.beverageBasics, {
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
</svelte:head>

<BeverageList {beverages} />
<Pagination order={1} {total} />
