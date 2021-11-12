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
	import StylesStats from '$lib/components/stats/styles/styles.svelte';

	translations.update(dictionary);

	export let statsData: StatsTypes;

	console.log('statsData', statsData);
</script>

<svelte:head>
	<title>{$translate('stats.title')}</title>
</svelte:head>

<StatsWrapper>
	<StylesStats />
</StatsWrapper>
