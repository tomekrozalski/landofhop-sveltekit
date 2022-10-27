<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import type { Sizes } from '$types/Charts.d';
	import Bars from './Bars.svelte';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';
	import { max } from 'd3-array';

	translations.update(dictionary);

	export let data: PageData;

	$: console.log('data', data);

	const timelineData = data.timelineData ?? [];
	$: ({ name } = data.insitution);

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

<svelte:head>
	<title>{$translate('brand.title', { name: data.insitution.name.value })}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<article>
	<MarkLanguage tag="h1" {name} />
	<TimelineWrapper {highestValue} {sizes}>
		<Bars {timelineData} {innerWidth} {innerHeight} {xScale} {xValue} {yScale} />
	</TimelineWrapper>
</article>
