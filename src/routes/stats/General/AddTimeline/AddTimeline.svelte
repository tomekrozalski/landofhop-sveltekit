<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { max } from 'd3-array';
	import { page } from '$app/stores';
	import IntersectionObserver from '$lib/utils/helpers/IntersectionObserver.svelte';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import type { AddTimelineBar } from '../utils/normalizers/Output.d';
	import type { Sizes } from '../utils/Sizes';
	import Bars from './Bars.svelte';
	import Line from './Line.svelte';
	import Legend from './Legend.svelte';

	const { addTimelineData } = $page.data.stats;

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

	const xValue = (d: AddTimelineBar) => d.date;

	const xScale = scaleBand()
		.domain(addTimelineData.map(xValue))
		.range([0, innerWidth])
		.padding(0.1);

	// Define vertical scale

	const total = (d: AddTimelineBar) => d.bottle + d.can;
	const highestValue = (max(addTimelineData, total) || 0) + 3;

	const yScale = scaleLinear().domain([0, highestValue]).range([innerHeight, 0]);

	let isBarSelected = false;
	let selectedLine: 'bottles' | 'cans' | 'total' | null = null;
</script>

<h2>{$translate('stats.general.addTimeline.name')}</h2>

<div>
	<TimelineWrapper {highestValue} let:intersecting>
		<Bars
			{addTimelineData}
			{innerWidth}
			{innerHeight}
			{xScale}
			{xValue}
			{yScale}
			{selectedLine}
			bind:isBarSelected
		/>
		{#if intersecting}
			<Line {addTimelineData} {xScale} {xValue} {yScale} bind:selectedLine {isBarSelected} />
		{/if}
	</TimelineWrapper>
</div>

<Legend {addTimelineData} bind:selectedLine />

<style>
	:global(svg) {
		--color-bottle: var(--color-brand-6);
		--color-can: var(--color-brand-5);
		--color-total: var(--color-brand-8);
	}
</style>
