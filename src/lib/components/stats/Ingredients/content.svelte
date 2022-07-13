<script lang="ts">
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';

	import List from './List.svelte';
	import ToggleBox from './ToggleBox.svelte';

	export let onUpdateClick: (badge: string) => void;

	export let data: IngredientsStatsTypes;
</script>

<p>
	Lista składników oraz liczba ich wystąpień w piwach w bazie danych. Posortowane od
	najpopularniejszych do najmniej popularnych.
</p>

<ul>
	<li>
		{data.tree.name.value} <span>({data.tree.occurrences.withSuccessors})</span>
		{#if data.tree.successors}
			<ToggleBox badge={data.tree.badge} />
			<List data={data.tree.successors} level={2} {onUpdateClick} />
		{/if}
	</li>
</ul>

<style>
	p {
		margin: 2rem 0;
	}

	ul :global(span) {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}

	ul {
		margin-left: 0.2rem;
	}

	ul,
	ul :global(ul) {
		padding: 0 2rem;
		position: relative;
	}

	ul :global(li) {
		position: relative;
	}

	ul :global(ul li::before) {
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
