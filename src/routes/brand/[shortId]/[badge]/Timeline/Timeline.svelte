<script lang="ts">
	import { max } from 'd3-array';
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import TimelineWrapper from '$lib/templates/TimelineWrapper/TimelineWrapper.svelte';
	import type { Sizes } from '$types/Charts.d';
	import type { BrandTimelineData, SelectedBar } from '../types.d';
	import Bars from './Bars.svelte';
	import Legend from './Legend.svelte';

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
<Legend />
<a href="/advanced-search?brands={$page.params.shortId}">Zobacz wszystkie piwa marki</a>

<style>
	p {
		margin: 4rem 0 2rem 0;
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
	}

	p::before {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-right: 1rem;
		width: 2rem;
		height: 2rem;
		border: 0.1rem solid var(--color-grey-1);
		border-radius: 50%;
		content: '?';
		color: var(--color-grey-1);
	}

	a {
		float: right;
		margin-inline: 2rem;
		font-size: 1.6rem;
		color: var(--color-black);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
