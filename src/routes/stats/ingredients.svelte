<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';

	export async function load({ fetch }) {
		const statsData: GeneralStatsTypes = await serverCall(fetch, Endpoints.statsGeneral, {
			pathParams: ['pl']
		});

		return { props: { statsData } };
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
</script>

<svelte:head>
	<title>{$translate('stats.ingredients.title')}</title>
</svelte:head>

<StatsWrapper>
	<IngredientsStats />
</StatsWrapper>
