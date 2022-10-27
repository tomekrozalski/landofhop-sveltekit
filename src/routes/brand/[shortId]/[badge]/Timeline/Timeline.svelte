<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { page } from '$app/stores';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import Bars from './Bars.svelte';
	import type { Sizes } from '$types/Charts.d';

	const timelineData = $page.data.timelineData ?? [];

	const sizes: Sizes = {
		width: 1160,
		height: 300,
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

	const xValue = (d: any) => d.date;

	const xScale = scaleBand().domain(timelineData.map(xValue)).range([0, innerWidth]).padding(0.1);

	// Define vertical scale

	const total = (d: any) => d.beverages?.length ?? 0;
	const highestValue = (max(timelineData, total) || 0) + 1;

	const yScale = scaleLinear().domain([0, highestValue]).range([innerHeight, 0]);

	// let isBarSelected = false;
	// let selectedLine: 'bottles' | 'cans' | 'total' | null = null;
</script>

<TimelineWrapper {highestValue} {sizes}>
	<Bars {timelineData} {innerWidth} {innerHeight} {xScale} {xValue} {yScale} />
</TimelineWrapper>
