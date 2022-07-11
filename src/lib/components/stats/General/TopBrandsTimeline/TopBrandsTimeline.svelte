<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import type { Brand, TopBrandsTimelineBar } from '$lib/utils/types/stats/General';
	import IntersectionObserver from '$lib/utils/helpers/intersectionObserver.svelte';
	import type { Sizes } from '$lib/components/stats/General/utils/Sizes';
	import Xaxis from '$lib/components/stats/General/utils/timeline/XAxis.svelte';
	import Yaxis from '$lib/components/stats/General/utils/timeline/YAxis.svelte';
	import Line from './Line.svelte';
	import Legend from './Legend.svelte';
	import Points from './Points.svelte';

	export let morePopularBrandsData: Brand[];
	export let topBrandsTimelineData: TopBrandsTimelineBar[];

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

<IntersectionObserver once={true} let:intersecting threshold={1}>
	<svg viewBox="0 0 {width} {height}">
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<Xaxis {innerHeight} {xScale} />
			<Yaxis {innerWidth} {yScale} />
			{#if intersecting}
				<Line {topBrandsTimelineData} {xScale} {xValue} {yScale} bind:selectedBrand />
				<Points {topBrandsTimelineData} {xScale} {yScale} bind:selectedBrand />
			{/if}
		</g>
	</svg>
</IntersectionObserver>

<Legend {morePopularBrandsData} {topBrandsTimelineData} bind:selectedBrand />
