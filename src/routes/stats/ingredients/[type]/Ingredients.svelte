<script lang="ts">
	import { formatLanguageValueFromDb } from '$lib/utils/normalizers/language';
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import type { IngredientsStats } from './types.d';
	import type { Ingredient } from '$lib/utils/stores/types/Ingredient.d';
	import UpdateIngredient from '$lib/templates/modals/UpdateIngredient/UpdateIngredient.svelte';
	import Content from './Content.svelte';
	import Navigation from './Navigation.svelte';

	let isModalOpen = false;
	let modalData: Ingredient | null = null;

	export let data: IngredientsStats;

	async function onUpdateClick(badge: string) {
		modalData = $ingredientsStore.find((props) => props.badge === badge) as Ingredient;
		isModalOpen = true;
	}
</script>

<Navigation {data} />
<Content {data} {onUpdateClick} />
{#if isModalOpen && modalData}
	<UpdateIngredient
		initialValues={{
			...modalData,
			name: formatLanguageValueFromDb(modalData.name)
		}}
		close={() => (isModalOpen = false)}
	/>
{/if}
