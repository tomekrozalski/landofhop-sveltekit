<script lang="ts">
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { page } from '$app/stores';
	import type { Basics } from '$lib/templates/BeverageList/Basics.d';
	import type { BrandTimelineData, SelectedBar } from '../types.d';

	export let highestValue: number;
	export let innerWidth: number;
	export let innerHeight: number;
	export let selectedBar: SelectedBar | null;

	const timelineData: BrandTimelineData[] = $page.data.timelineData ?? [];

	// Define horizontal scale

	const xValue = (d: BrandTimelineData) => d.date;
	const xScale = scaleBand().domain(timelineData.map(xValue)).range([0, innerWidth]).padding(0.1);

	// Define vertical scale

	const yValue = (items: Basics[]) => items.length;
	const yScale = scaleLinear().domain([0, highestValue]).range([innerHeight, 0]);

	function setHorintalPosition(bar: BrandTimelineData) {
		return xScale(xValue(bar) || '');
	}

	function setVerticalPosition(items: Basics[]) {
		return yScale(yValue(items));
	}

	const onBarClick = (values: SelectedBar) => () => {
		selectedBar = values;
	};

	function onBarKeyPress() {
		console.log('@ToDo');
	}
</script>

<g>
	{#each timelineData as bar}
		{#if bar.beverages}
			<rect
				class="beverages"
				class:highlighted={selectedBar?.date === bar.date && selectedBar?.type === 'beverages'}
				on:click={onBarClick({ items: bar.beverages, date: bar.date, type: 'beverages' })}
				on:keypress={onBarKeyPress}
				width={xScale.bandwidth()}
				height={innerHeight - yScale(yValue(bar.beverages))}
				x={setHorintalPosition(bar)}
				y={setVerticalPosition(bar.beverages)}
			/>
		{/if}
		{#if bar.asCooperator}
			<rect
				class="cooperator"
				class:highlighted={selectedBar?.date === bar.date && selectedBar?.type === 'cooperator'}
				on:click={onBarClick({ items: bar.asCooperator, date: bar.date, type: 'cooperator' })}
				on:keypress={onBarKeyPress}
				width={xScale.bandwidth()}
				height={innerHeight - yScale(yValue(bar.asCooperator))}
				x={setHorintalPosition(bar)}
				y={setVerticalPosition(bar.asCooperator) -
					(innerHeight - yScale(yValue(bar.beverages ?? [])))}
			/>
		{/if}
		{#if bar.asContractor}
			<rect
				class="contractor"
				class:highlighted={selectedBar?.date === bar.date && selectedBar?.type === 'contractor'}
				on:click={onBarClick({ items: bar.asContractor, date: bar.date, type: 'contractor' })}
				on:keypress={onBarKeyPress}
				width={xScale.bandwidth()}
				height={innerHeight - yScale(yValue(bar.asContractor))}
				x={setHorintalPosition(bar)}
				y={setVerticalPosition(bar.asContractor) -
					(innerHeight - yScale(yValue(bar.asCooperator ?? []))) -
					(innerHeight - yScale(yValue(bar.beverages ?? [])))}
			/>
		{/if}
	{/each}
</g>

<style>
	rect {
		transition: fill var(--transition-default);
		cursor: pointer;
	}

	rect.beverages {
		fill: var(--color-brand-6);
	}

	rect.cooperator {
		fill: var(--color-brand-10-light);
	}

	rect.cooperator:hover {
		fill: var(--color-brand-10);
	}

	rect.contractor {
		fill: var(--color-brand-5-light);
	}

	rect.contractor:hover {
		fill: var(--color-brand-5);
	}

	rect.highlighted {
		fill: var(--color-brand-3);
	}
</style>
