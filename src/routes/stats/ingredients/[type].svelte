<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';
	import type { Ingredient as IngredientType } from '$lib/utils/types/Ingredient';

	// export const prerender = true;

	export async function load({ fetch, params, session }) {
		try {
			if (session.isLoggedIn) {
				const [statsData, ingredients]: [
					IngredientsStatsTypes,
					IngredientType[]
				] = await Promise.all([
					apiCall(fetch, Endpoints.statsIngredients, { pathParams: ['pl', params.type] }),
					apiCall(fetch, Endpoints.ingredients)
				]);

				return { props: { statsData, ingredients } };
			}

			const statsData: IngredientsStatsTypes = await apiCall(fetch, Endpoints.statsIngredients, {
				pathParams: ['pl', params.type]
			});

			return { props: { statsData, ingredients: [] } };
		} catch {
			return {
				props: { statsData: [], ingredients: [] }
			};
		}
	}
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import statsDictionary from '$lib/utils/dictionary/screens/stats/common.json';
	import ingredientsStatsDictionary from '$lib/utils/dictionary/screens/stats/ingredients.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import Ingredients from '$lib/components/stats/ingredients/ingredients.svelte';

	translations.update(statsDictionary);
	translations.update(ingredientsStatsDictionary);

	export let statsData: IngredientsStatsTypes;
	export let ingredients: IngredientType[];

	ingredientsStore.set(ingredients);
</script>

<svelte:head>
	<title>{$translate('stats.ingredients.title')}</title>
</svelte:head>

<StatsWrapper>
	{#if statsData}
		<Ingredients data={statsData} />
	{/if}
</StatsWrapper>
