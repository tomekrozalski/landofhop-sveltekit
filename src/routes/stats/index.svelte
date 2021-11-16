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
	import generalStatsDictionary from '$lib/utils/dictionary/screens/stats/general.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import GeneralStats from '$lib/components/stats/general/general.svelte';

	translations.update(statsDictionary);
	translations.update(generalStatsDictionary);

	export let statsData: GeneralStatsTypes;
</script>

<svelte:head>
	<title>{$translate('stats.general.title')}</title>
</svelte:head>

<StatsWrapper>
	<GeneralStats {statsData} />
</StatsWrapper>
