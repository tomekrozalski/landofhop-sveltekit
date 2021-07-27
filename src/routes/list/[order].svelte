<script context="module" lang="ts">
	export async function load({ page }) {
		const order = page.params.order;
		const skip = order * 60 - 60;

		const totalResponse = await fetch('http://localhost:4001/beverage/total');
		const total: number = await totalResponse.json();

		const beveragesResponse = await fetch(`http://localhost:4001/beverage/basics/en/${skip}/60`);
		const beverages = await beveragesResponse.json();

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
	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import BeverageList from '$lib/components/beverageList/beverageList.svelte';

	export let order: string;
	export let beverages: Basics[];
	export let total: number;
</script>

<svelte:head>
	<title>Land of Hop, 📄 {order}</title>
</svelte:head>

<BeverageList {order} />
<ul>
	{#each beverages as beverage}
		<li>{beverage.badge}</li>
	{/each}
</ul>
<div>pagination {total}</div>
