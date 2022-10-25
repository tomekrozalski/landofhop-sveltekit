<script lang="ts">
	import { translate } from 'svelte-intl';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { page } from '$app/stores';
	// import type { TopBrandsTimelineBar } from '../utils/normalizers/Output.d';
	import IntersectionObserver from '$lib/utils/helpers/IntersectionObserver.svelte';
	// import type { Sizes } from '../utils/Sizes';
	import Xaxis from '../../../../routes/stats/General/utils/timeline/XAxis.svelte';
	import Yaxis from '../../../../routes/stats/General/utils/timeline/YAxis.svelte';
	import Line from '../../../../routes/stats/General/TopBrandsTimeline/Line.svelte';
	import Legend from '../../../../routes/stats/General/TopBrandsTimeline/Legend.svelte';
	import Points from '../../../../routes/stats/General/TopBrandsTimeline/Points.svelte';

	const { formattedBasics } = $page.data;

	const sizes: any = {
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

	const xValue = (d: any) => d.date;

	const xScale = scaleBand()
		.domain(formattedBasics.map(xValue))
		.range([0, innerWidth])
		.padding(0.1);

	// Define vertical scale

	const highestValue = Math.max(...formattedBasics.map(({ beverages }) => beverages?.length ?? 0));

	const yScale = scaleLinear()
		.domain([0, highestValue + 3])
		.range([innerHeight, 0]);

	let selectedBrand: string | null = null;
</script>

<h2>{$translate('stats.general.topBrandsTimeline.name')}</h2>
<svg viewBox="0 0 {width} {height}">
	<g style="transform: translate({margin.left}px, {margin.top}px)">
		<Xaxis {innerHeight} {xScale} />
		<Yaxis {innerWidth} {yScale} />
	</g>
</svg>
