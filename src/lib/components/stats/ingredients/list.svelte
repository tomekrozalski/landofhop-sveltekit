<script lang="ts">
	import type { IngredientTree } from '$lib/utils/types/Ingredient.d';
	import ToggleBox from './toggleBox.svelte';

	export let data: IngredientTree[];
	export let level: number;
</script>

<ul class="level-{level % 2 ? 1 : 2}">
	{#each data as { badge, name, occurrences, successors }}
		<li>
			{name.value}
			<span>({occurrences.withSuccessors})</span>
			{#if occurrences.alone !== occurrences.withSuccessors}
				<ToggleBox {badge} />
			{/if}
			{#if successors}
				<svelte:self data={successors} level={level + 1} />
			{/if}
		</li>
	{/each}
</ul>
