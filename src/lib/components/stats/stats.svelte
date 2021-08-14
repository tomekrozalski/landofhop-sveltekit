<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Stats as StatsTypes } from '$lib/utils/types/Beverage/Stats';
	import AlcoholChart from './alcoholChart/alcoholChart.svelte';

	export let statsData: StatsTypes;
	const { alcoholChartData } = statsData;
</script>

<article>
	<h1>{$translate('stats.name')}</h1>
	<AlcoholChart {alcoholChartData} />
	<!-- <AddTimeline data={addTimelineData} /> -->
	<!-- <FermentationTimeline data={fermentationTimelineData} /> -->
	<!-- <TopBrandsTimeline data={topBrandsTimelineData} /> -->
</article>

<style>
	article {
		padding: 2rem;
	}

	:global(line) {
		stroke: var(--color-black);
	}

	:global(line.light) {
		stroke: var(--color-grey-3);
	}

	:global(text) {
		font: var(--font-weight-light) 1.5rem / 1 var(--font-primary);
	}

	:global(text.label) {
		font-weight: var(--font-weight-regular);
		font-size: 1.8rem;
	}
</style>
