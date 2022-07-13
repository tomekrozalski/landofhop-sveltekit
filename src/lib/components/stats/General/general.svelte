<script lang="ts">
	import type { GeneralStats as GeneralStatsTypes } from '$lib/utils/types/stats/General';
	import AlcoholChart from './AlcoholChart/AlcoholChart.svelte';
	import AddTimeline from './AddTimeline/AddTimeline.svelte';
	import TopBrandsTimeline from './TopBrandsTimeline/TopBrandsTimeline.svelte';
	import RatingsChart from './RatingsChart/RatingsChart.svelte';

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
