<script lang="ts">
	import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';
	import AlcoholChart from './alcoholChart/alcoholChart.svelte';
	import AddTimeline from './addTimeline/addTimeline.svelte';
	import TopBrandsTimeline from './topBrandsTimeline/topBrandsTimeline.svelte';
	import RatingsChart from './ratingsChart/ratingsChart.svelte';

	export let statsData: GeneralStatsTypes;
	const {
		addTimelineData,
		alcoholChartData,
		morePopularBrandsData,
		ratingsChartData,
		topBrandsTimelineData
	} = statsData;
</script>

<AlcoholChart {alcoholChartData} />
<AddTimeline {addTimelineData} />
<!-- <FermentationTimeline data={fermentationTimelineData} /> -->
<TopBrandsTimeline {morePopularBrandsData} {topBrandsTimelineData} />
<RatingsChart {ratingsChartData} />
