<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

	export async function load({ fetch }) {
		const statsData: StylesStatsTypes[] = await serverCall(fetch, Endpoints.statsStyles, {
			pathParams: ['pl']
		});

		return { props: { statsData } };
	}
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import statsDictionary from '$lib/utils/dictionary/stats.json';
	import stylesStatsDictionary from '$lib/utils/dictionary/statsStyles.json';
	import styleGroupsDictionary from '$lib/utils/dictionary/styleGroups.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import StylesStats from '$lib/components/stats/styles/styles.svelte';

	translations.update(statsDictionary);
	translations.update(stylesStatsDictionary);
	translations.update(styleGroupsDictionary);

	export let statsData: StylesStatsTypes[];
</script>

<svelte:head>
	<title>{$translate('statsStyles.title')}</title>
</svelte:head>

<StatsWrapper>
	<StylesStats {statsData} />
</StatsWrapper>
