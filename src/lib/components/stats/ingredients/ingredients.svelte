<script lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import { ingredientsStore } from '$lib/dashboard/utils/stores';
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
	import UpdateIngredient from '$lib/dashboard/modals/updateIngredient/updateIngredient.svelte';
	import type { Ingredient } from '$lib/utils/types/Ingredient';

	import Content from './content.svelte';
	import Navigation from './navigation.svelte';

	let isModalOpen = false;
	let modalData: Ingredient | null = null;

	export let data: IngredientsStatsTypes;

	async function onUpdateClick(badge: string) {
		if ($ingredientsStore.length === 0) {
			console.log('!');
			const ingredients = await apiCall(fetch, Endpoints.ingredients);

			console.log({ ingredients });
			ingredientsStore.set(ingredients);
		}

		modalData = $ingredientsStore.find((props) => props.badge === badge);
		isModalOpen = true;
	}
</script>

<Navigation {data} />
<Content {data} {onUpdateClick} />
{#if isModalOpen}
	<UpdateIngredient initialValues={modalData} close={() => (isModalOpen = false)} />
{/if}
