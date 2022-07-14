<script lang="ts">
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
	import type { Ingredient } from '$lib/utils/types/Ingredient';
	import UpdateIngredient from '$lib/dashboard/modals/UpdateIngredient/UpdateIngredient.svelte';

	import Content from './2Content.svelte';
	import Navigation from './Navigation.svelte';

	let isModalOpen = false;
	let modalData: Ingredient | null = null;

	export let data: IngredientsStatsTypes;

	async function onUpdateClick(badge: string) {
		modalData = $ingredientsStore.find((props) => props.badge === badge);
		isModalOpen = true;
	}
</script>

<Navigation {data} />
<Content {data} {onUpdateClick} />
{#if isModalOpen}
	<UpdateIngredient initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}
