<script lang="ts">
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
	import Navigation from './navigation.svelte';

	export let data: IngredientsStatsTypes;
</script>

<Navigation navigation={data.navigation} />

<ul>
	<li>{data.tree.name.value} Słody ({data.tree.occurrences.withSuccessors})</li>
	<ul>
		{#each data.tree.successors as item}
			<li>
				{item.name.value}
				{item.occurrences.alone}
				({item.occurrences.withSuccessors})
			</li>
		{/each}
	</ul>
</ul>

<style>
	ul {
		padding: 0 2rem;
	}

	li {
		list-style-type: circle;
	}

	ul ul li {
		list-style-type: square;
	}

	ul ul ul li {
		list-style-type: disc;
	}
</style>
