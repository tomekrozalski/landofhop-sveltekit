<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
	import type { IngredientTree } from '$lib/utils/types/Ingredient.d';
	import FindAll from '$lib/components/stats/elements/FindAll.svelte';
	import UpdateButton from '$lib/components/stats/elements/UpdateButton.svelte';

	import ToggleBox from './ToggleBox.svelte';

	export let data: IngredientTree[];
	export let level: number;
	export let onUpdateClick: (badge: string) => void;
</script>

<ul class="level-{level % 2 ? 1 : 2}">
	{#each data as { badge, name, occurrences, successors, successorsList }}
		<li>
			{name.value}
			<span>({occurrences.withSuccessors})</span>
			<FindAll query="ingredientTags={[badge, ...(successorsList || [])]}" />
			{#if occurrences.alone !== occurrences.withSuccessors}
				<ToggleBox {badge} />
			{/if}
			{#if $navigation.isLoggedIn}
				<UpdateButton {badge} {onUpdateClick} />
			{/if}
			{#if successors}
				<svelte:self data={successors} level={level + 1} {onUpdateClick} />
			{/if}
		</li>
	{/each}
</ul>
