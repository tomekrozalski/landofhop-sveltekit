<script lang="ts">
	import { max } from 'd3-array';
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import type { Sizes } from '$types/Charts.d';
	import type { BrandTimelineData, SelectedBar } from '../types.d';
	import Bars from './Bars.svelte';

	export let selectedBar: SelectedBar | null;
	const timelineData: BrandTimelineData[] = $page.data.timelineData ?? [];

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

	const total = ({ beverages, asCooperator, asContractor }: BrandTimelineData) =>
		(beverages?.length || 0) + (asCooperator?.length || 0) + (asContractor?.length || 0);
	const highestValue = (max(timelineData, total) || 0) + 1;
</script>

<p>{$translate('brand.clickOnBarInfo')}</p>
<TimelineWrapper {highestValue} {sizes}>
	<Bars {highestValue} {innerWidth} {innerHeight} bind:selectedBar />
</TimelineWrapper>

<style>
	p {
		margin: 4rem 0 2rem 0;
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
	}
</style>
