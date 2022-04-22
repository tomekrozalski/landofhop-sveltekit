<script lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import { ingredientsStore } from '$lib/dashboard/utils/stores';
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
	import UpdateIngredient from '$lib/dashboard/modals/updateIngredient/updateIngredient.svelte';
	import type { Ingredient } from '$lib/utils/types/Ingredient';

	import Navigation from './navigation.svelte';
	import List from './list.svelte';
	import ToggleBox from './toggleBox.svelte';

	export let data: IngredientsStatsTypes;

	let isModalOpen = false;
	let modalData: Ingredient | null = null;

	async function onUpdateClick(badge: string) {
		if ($ingredientsStore.length === 0) {
			const ingredients = await apiCall(fetch, Endpoints.ingredients);
			ingredientsStore.set(ingredients);
		}

		modalData = $ingredientsStore.find((props) => props.badge === badge);
		isModalOpen = true;
	}
</script>

<Navigation navigation={data.navigation} />

<p>
	Lista składników oraz liczba ich wystąpień w piwach w bazie danych. Posortowane od
	najpopularniejszych do najmniej popularnych.
</p>

<ul>
	<li>{data.tree.name.value} <span>({data.tree.occurrences.withSuccessors})</span></li>
	{#if data.tree.successors}
		<ToggleBox badge={data.tree.badge} />
		<List data={data.tree.successors} level={2} {onUpdateClick} />
	{/if}
</ul>

{#if isModalOpen}
	<UpdateIngredient initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}

<style>
	p {
		margin: 2rem 0;
	}

	ul :global(span) {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}

	ul {
		margin: 2rem 4rem;
	}

	ul,
	ul :global(ul) {
		padding: 0 2rem;
		position: relative;
	}

	ul :global(li) {
		position: relative;
	}

	ul :global(li::before) {
		display: inline-block;
		content: '';
		width: 2.6rem;
		height: 0.1rem;
		background-color: var(--color-grey-2);
		position: absolute;
		top: 1.5rem;
		left: -3.2rem;
	}

	ul :global(ul li::after) {
		display: inline-block;
		content: '';
		width: 0.1rem;
		height: 100%;
		background-color: var(--color-grey-2);
		position: absolute;
		top: -1.4rem;
		left: -3.2rem;
	}
</style>
