<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

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
	export let beverages: Basics[];
	export let total: number;

	import { onMount } from 'svelte';
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	let Pagination;
	const sleep = (ms) => new Promise((f) => setTimeout(f, ms));

	onMount(async () => {
		await sleep(1000);
		Pagination = (await import('$lib/components/beverageList/pagination.svelte')).default;
	});
</script>

<svelte:head>
	<title>Land of Hop</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<BeverageList {beverages} />
<svelte:component this={Pagination} order={1} {total} />
