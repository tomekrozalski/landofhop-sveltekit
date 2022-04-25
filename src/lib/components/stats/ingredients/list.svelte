<script lang="ts">
	import { session } from '$app/stores';
	import type { IngredientTree } from '$lib/utils/types/Ingredient.d';
	import FindAll from '$lib/components/stats/elements/findAll.svelte';
	import UpdateButton from '$lib/components/stats/elements/updateButton.svelte';

	import ToggleBox from './toggleBox.svelte';

	export let data: IngredientTree[];
	export let level: number;
	export let onUpdateClick: (badge: string) => void;
</script>

<ul class="level-{level % 2 ? 1 : 2}">
	{#each data as { badge, name, occurrences, successors }}
		<li>
			{name.value}
			<span>({occurrences.withSuccessors})</span>
			<FindAll query="ingredient%3a{badge}" />
			{#if occurrences.alone !== occurrences.withSuccessors}
				<ToggleBox {badge} />
			{/if}
			{#if $session.isLoggedIn}
				<UpdateButton {badge} {onUpdateClick} />
			{/if}
			{#if successors}
				<svelte:self data={successors} level={level + 1} {onUpdateClick} />
			{/if}
		</li>
	{/each}
</ul>
