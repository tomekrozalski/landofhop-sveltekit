<script lang="ts">
	import type { Stats as StatsTypes } from '$lib/utils/types/Beverage/Stats';
	import AlcoholChart from './alcoholChart/alcoholChart.svelte';
	import AddTimeline from './addTimeline/addTimeline.svelte';

	export let statsData: StatsTypes;
	const { addTimelineData, alcoholChartData } = statsData;
</script>

<AlcoholChart {alcoholChartData} />
<AddTimeline {addTimelineData} />
<!-- <FermentationTimeline data={fermentationTimelineData} /> -->
<!-- <TopBrandsTimeline data={topBrandsTimelineData} /> -->
