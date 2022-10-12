<script lang="ts">
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import type { IngredientsStats as IngredientsStatsTypes } from 'src/oldTypes/stats/General';
	import type { Ingredient } from 'src/oldTypes/Ingredient';
	import UpdateIngredient from '$lib/templates/modals/UpdateIngredient/UpdateIngredient.svelte';
	import Content from './Content.svelte';
	import Navigation from './Navigation.svelte';

	let isModalOpen = false;
	let modalData: Ingredient | null = null;

	export let data: IngredientsStatsTypes;

	async function onUpdateClick(badge: string) {
		modalData = $ingredientsStore.find((props) => props.badge === badge) as Ingredient;
		isModalOpen = true;
	}
</script>

<Navigation {data} />
<Content {data} {onUpdateClick} />
{#if isModalOpen && modalData}
	<UpdateIngredient initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}
