<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import type { LanguageValue } from '$types/LanguageValue.d';
	import type { IngredientType } from '$types/enums/Beverage.enum';

	type IngredientTags = {
		badge: string;
		name: LanguageValue;
		type: IngredientType;
	};

	$: ingredientsTags = $page.data.details.ingredientsTags ?? {};
	$: ingredients = [...(ingredientsTags.label ?? []), ...(ingredientsTags.producer ?? [])].reduce(
		(acc, curr) =>
			acc.find(({ badge }: IngredientTags) => badge === curr.badge) ? acc : [...acc, curr],
		[]
	);
</script>

{#if ingredients.length}
	<dt>
		{$translate('beverage.testimonial.ingredientsByTag')}
	</dt>
	<dd>
		<ul>
			{#each ingredients as { badge, name, type }}
				<li>
					<MarkLanguage
						class={type}
						href="/advanced-search?ingredientTags={badge}"
						tag="a"
						{name}
					/>
				</li>
			{/each}
		</ul>
	</dd>
{/if}

<style>
	dt {
		margin-top: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		margin-top: 1.2rem;
	}

	li {
		font-size: 1.3rem;
		font-weight: var(--font-weight-regular);
		margin: 0 0.6rem 0.6rem 0;
	}

	li :global(a) {
		display: inline-block;
		padding: 0 0.8rem;
		border-radius: 0.4rem;
		color: white;
		/* opacity: 0.5; */
		transition: background-color var(--transition-default);
	}

	li :global(a.water) {
		background-color: var(--color-ingredients-water-light);
	}

	li :global(a.water:hover) {
		background-color: var(--color-ingredients-water);
	}

	li :global(a.malt) {
		background-color: var(--color-ingredients-malt-light);
	}

	li :global(a.malt:hover) {
		background-color: var(--color-ingredients-malt);
	}

	li :global(a.hop) {
		background-color: var(--color-ingredients-hop-light);
	}

	li :global(a.hop:hover) {
		background-color: var(--color-ingredients-hop);
	}

	li :global(a.yeast) {
		background-color: var(--color-ingredients-yeast-light);
	}

	li :global(a.yeast:hover) {
		background-color: var(--color-ingredients-yeast);
	}

	li :global(a.addition) {
		background-color: var(--color-ingredients-addition-light);
	}

	li :global(a.addition:hover) {
		background-color: var(--color-ingredients-addition);
	}
</style>
