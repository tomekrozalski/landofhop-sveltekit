<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { IngredientsStats as IngredientsStatsTypes } from '$lib/utils/types/stats/General';

	export const prerender = true;

	export async function load({ fetch, params }) {
		const data: IngredientsStatsTypes = await apiCall(fetch, Endpoints.statsIngredients, {
			pathParams: ['pl', params.type]
		});

		return { props: { data } };
	}
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import statsDictionary from '$lib/utils/dictionary/screens/stats/common.json';
	import ingredientsStatsDictionary from '$lib/utils/dictionary/screens/stats/ingredients.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import IngredientsStats from '$lib/components/stats/ingredients/ingredients.svelte';

	translations.update(statsDictionary);
	translations.update(ingredientsStatsDictionary);

	export let data: IngredientsStatsTypes;
</script>

<svelte:head>
	<title>{$translate('stats.ingredients.title')}</title>
</svelte:head>

<StatsWrapper>
	{#if data}
		<IngredientsStats {data} />
	{/if}
</StatsWrapper>
