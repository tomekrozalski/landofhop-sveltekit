<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import type { AddTimelineBar } from '$lib/utils/types/stats/General';
	import type { TopBrandsTimelineBar } from '$lib/utils/types/stats/General';
	import IntersectionObserver from '$lib/utils/helpers/intersectionObserver.svelte';
	import type { Sizes } from '$lib/components/stats/general/utils/Sizes';
	import Xaxis from '$lib/components/stats/general/utils/timeline/xAxis.svelte';
	import Yaxis from '$lib/components/stats/general/utils/timeline/yAxis.svelte';
	import Line from './line.svelte';
	// import Legend from './legend.svelte';

	export let topBrandsTimelineData: TopBrandsTimelineBar[];

	const sizes: Sizes = {
		chart: {
			width: 1160,
			height: 600,
			margin: {
				top: 40,
				right: 20,
				bottom: 60,
				left: 100
			}
		},
		legend: {
			width: 1160,
			height: 70,
			margin: {
				top: 20,
				right: 40,
				bottom: 20,
				left: 40
			}
		}
	};

	const { height, margin, width } = sizes.chart;
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

	const total = (d: AddTimelineBar) => d.bottle + d.can;

	const yScale = scaleLinear()
		.domain([0, highestValue + 3])
		.range([innerHeight, 0]);

	// 	let isBarSelected = false;
	let selectedLine = null;
</script>

<h2>{$translate('stats.general.topBrandsTimeline.name')}</h2>

<IntersectionObserver once={true} let:intersecting threshold={1}>
	<svg viewBox="0 0 {sizes.chart.width} {sizes.chart.height + sizes.legend.height}">
		<g style="transform: translate({sizes.chart.margin.left}px, {sizes.chart.margin.top}px)">
			<Xaxis {innerHeight} {xScale} />
			<Yaxis {innerWidth} {yScale} />
			{#if intersecting}
				<Line {topBrandsTimelineData} {xScale} {xValue} {yScale} bind:selectedLine />
			{/if}
		</g>
	</svg>
</IntersectionObserver>

<ol>
	{#each topBrandsTimelineData[topBrandsTimelineData.length - 1].brands as { amount, id, name }}
		<li class:highlighted={id === selectedLine}>
			{name.value}, wypitych piw: {amount}
		</li>
	{/each}
</ol>

<style>
	/* svg {
		--color-bottle: var(--color-brand-6);
		--color-can: var(--color-brand-5);
		--color-total: var(--color-brand-8);
	} */

	li {
		padding-left: 1rem;
		list-style-type: decimal;
	}

	.highlighted {
		font-weight: var(--font-weight-medium);
	}
</style>
