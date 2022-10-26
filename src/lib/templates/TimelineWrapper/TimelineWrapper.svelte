<script lang="ts">
	import { add, format, isBefore } from 'date-fns';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { translations } from 'svelte-intl';
	import IntersectionObserver from '$lib/utils/helpers/IntersectionObserver.svelte';
	import type { Sizes, YearMonth } from '$types/Charts.d';
	import Xaxis from './XAxis.svelte';
	import Yaxis from './YAxis.svelte';
	import dictionary from './dictionary.json';

	translations.update(dictionary);

	export let highestValue = 10;

	export let startDate: YearMonth = {
		month: 6,
		year: 2017
	};

	export let finishDate: YearMonth = {
		month: Number(format(new Date(), 'MM')),
		year: Number(format(new Date(), 'yyyy'))
	};

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

	const dateList = [];
	let currentDate = new Date(`${startDate.year} ${startDate.month} 1`);

	do {
		dateList.push(currentDate);
		const nextMonthDate = add(currentDate, { months: 1 });
		currentDate = nextMonthDate;
	} while (
		isBefore(currentDate, add(new Date(`${finishDate.year} ${finishDate.month} 1`), { months: 1 }))
	);

	const xValue = (d: Date) => format(d, 'yyyy-MM');
	const xScale = scaleBand().domain(dateList.map(xValue)).range([0, innerWidth]).padding(0.1);

	// Define vertical scale
	const yScale = scaleLinear().domain([0, highestValue]).range([innerHeight, 0]);
</script>

<IntersectionObserver once={true} let:intersecting threshold={1}>
	<svg viewBox="0 0 {width} {height}">
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<Xaxis {innerHeight} {xScale} />
			<Yaxis {innerWidth} {yScale} />
			<slot {intersecting} />
		</g>
	</svg>
</IntersectionObserver>
