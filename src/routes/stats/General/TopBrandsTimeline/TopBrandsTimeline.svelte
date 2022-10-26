<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { page } from '$app/stores';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import type { TopBrandsTimelineBar } from '../utils/normalizers/Output.d';
	import type { Sizes } from '../utils/Sizes';
	import Line from './Line.svelte';
	import Legend from './Legend.svelte';
	import Points from './Points.svelte';

	const { morePopularBrandsData, topBrandsTimelineData } = $page.data.stats;

	const sizes: Sizes = {
		width: 1160,
		height: 600,
		margin: {
			top: 40,
			right: 20,
			bottom: 60,
			left: 100
		}
	};

	const { height, margin, width } = sizes;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Define horizontal scale

	const xValue = (d: TopBrandsTimelineBar) => d.date;

	const xScale = scaleBand()
		.domain(topBrandsTimelineData.map(xValue))
		.range([0, innerWidth])
		.padding(0.1);

	// Define vertical scale

	const highestValue = Math.max(
		...topBrandsTimelineData[topBrandsTimelineData.length - 1].brands.map(({ amount }) => amount)
	);

	const yScale = scaleLinear()
		.domain([0, highestValue + 3])
		.range([innerHeight, 0]);

	let selectedBrand: string | null = null;
</script>

<h2>{$translate('stats.general.topBrandsTimeline.name')}</h2>

<TimelineWrapper highestValue={highestValue + 3} let:intersecting>
	{#if intersecting}
		<Line {topBrandsTimelineData} {xScale} {xValue} {yScale} bind:selectedBrand />
		<Points {topBrandsTimelineData} {xScale} {yScale} bind:selectedBrand />
	{/if}
</TimelineWrapper>

<Legend {morePopularBrandsData} {topBrandsTimelineData} bind:selectedBrand />
