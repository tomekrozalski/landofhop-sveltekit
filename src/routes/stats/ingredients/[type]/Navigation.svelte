<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { IngredientsStats as IngredientsStatsTypes } from './types.d';

	export let data: IngredientsStatsTypes;
</script>

<ul>
	{#each data.navigation as { active, badge, occurrences }}
		<li>
			<a class={badge} class:active href="/stats/ingredients/{badge}">
				{$translate(`stats.ingredients.type.${badge}`)} <span>({occurrences})</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 0;
	}

	li {
		flex: 0 1 1;
		width: calc(50% - 0.5rem);
	}

	a {
		display: block;
		color: inherit;
		padding: 1rem;
		text-align: center;
		color: var(--color-black);
		background-color: var(--color-grey-4);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	a:hover,
	a.active {
		color: var(--color-white);
	}

	a.water:hover,
	a.water.active {
		background-color: var(--color-ingredients-water);
	}

	a.malt:hover,
	a.malt.active {
		background-color: var(--color-ingredients-malt);
	}

	a.hop:hover,
	a.hop.active {
		background-color: var(--color-ingredients-hop);
	}

	a.yeast:hover,
	a.yeast.active {
		background-color: var(--color-ingredients-yeast);
	}

	a.addition:hover,
	a.addition.active {
		background-color: var(--color-ingredients-addition);
	}

	span {
		font-size: 1.4rem;
		line-height: 1;
		color: var(--color-grey-1);
		transition: color var(--transition-default);
	}

	a.water span,
	a.hop span,
	a.addition span {
		color: var(--color-grey-1);
	}

	a.water:hover span,
	a.water.active span,
	a.hop:hover span,
	a.hop.active span,
	a.addition:hover span,
	a.addition.active span {
		color: var(--color-grey-3);
	}

	a.malt:hover span,
	a.malt.active span,
	a.yeast:hover span,
	a.yeast.active span {
		color: var(--color-white);
	}

	@media (min-width: 1024px) {
		ul {
			flex-wrap: nowrap;
		}
	}
</style>
