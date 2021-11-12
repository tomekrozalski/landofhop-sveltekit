<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { Stats as StatsTypes } from '$lib/utils/types/Beverage/Stats';

	export async function load({ fetch }) {
		const statsData: StatsTypes = await serverCall(fetch, Endpoints.beverageStats, {
			pathParams: ['pl']
		});

		return { props: { statsData } };
	}
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/stats.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import GeneralStats from '$lib/components/stats/general/general.svelte';

	translations.update(dictionary);

	export let statsData: StatsTypes;
</script>

<svelte:head>
	<title>{$translate('stats.title')}</title>
</svelte:head>

<StatsWrapper>
	<GeneralStats {statsData} />
</StatsWrapper>
