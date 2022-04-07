<script lang="ts">
	import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';
	import AlcoholChart from './alcoholChart/alcoholChart.svelte';
	import AddTimeline from './addTimeline/addTimeline.svelte';
	import TopBrandsTimeline from './topBrandsTimeline/topBrandsTimeline.svelte';

	export let statsData: GeneralStatsTypes;
	const { addTimelineData, alcoholChartData, topBrandsTimelineData } = statsData;
</script>

<AlcoholChart {alcoholChartData} />
<AddTimeline {addTimelineData} />
<!-- <FermentationTimeline data={fermentationTimelineData} /> -->
<TopBrandsTimeline {topBrandsTimelineData} />
