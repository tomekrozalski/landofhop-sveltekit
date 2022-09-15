<script context="module" lang="ts">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import apiCall, { Endpoints } from '$lib/utils/api/call';
	// import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';

	// export const prerender = true;

	// export async function load({ fetch }) {
	// 	const statsData: GeneralStatsTypes = await apiCall(fetch, Endpoints.statsGeneral, {
	// 		pathParams: ['pl']
	// 	});

	// 	return { props: { statsData } };
	// }
</script>

<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { translations, translate } from 'svelte-intl';
	import statsDictionary from '$lib/utils/dictionary/screens/stats/common.json';
	import generalStatsDictionary from '$lib/utils/dictionary/screens/stats/general.json';
	import StatsWrapper from '$lib/components/stats/elements/Wrapper.svelte';
	import GeneralStats from '$lib/components/stats/General/General.svelte';

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
