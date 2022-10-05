<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import type { RatingsChartBar } from '$lib/utils/types/stats/General';

	import type { Sizes } from '../utils/Sizes';
	import Xaxis from '../utils/chartBars/XAxis.svelte';
	import Yaxis from '../utils/chartBars/YAxis.svelte';
	import Bars from './Bars.svelte';

	export let ratingsChartData: RatingsChartBar[];

	const sizes: Sizes = {
		width: 1160,
		height: 600,
		margin: {
			top: 35,
			right: 20,
			bottom: 85,
			left: 100
		}
	};

	const { height, margin, width } = sizes;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Define horizontal scale

	const xValue = (d: RatingsChartBar) => d.value.toString();

	const xScale = scaleBand()
		.domain(ratingsChartData.map(xValue))
		.range([0, innerWidth])
		.padding(0.1);

	// Define vertical scale

	const yValue = (d: RatingsChartBar) => d.beverages;

	const yScale = scaleLinear()
		.domain([0, max(ratingsChartData, yValue) || 10 + 3])
		.range([innerHeight, 0]);
</script>

<h2>{$translate('stats.general.ratings.name')}</h2>

<svg viewBox="0 0 {width} {height}">
	<g style="transform: translate({margin.left}px, {margin.top}px)">
		<Xaxis
			{innerHeight}
			{innerWidth}
			label={$translate('stats.general.ratings.ratings')}
			{xScale}
			xScaleTicks={xScale.domain()}
		/>
		<Yaxis {innerWidth} {yScale} />
		<Bars {ratingsChartData} {innerHeight} {xScale} {xValue} {yValue} {yScale} />
	</g>
</svg>
