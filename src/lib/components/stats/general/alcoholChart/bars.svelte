<script lang="ts">
	import type { AlcoholChartBar } from '$lib/utils/types/stats/General';
	import Info from './info.svelte';

	export let alcoholChartData: AlcoholChartBar[];
	export let innerHeight: number;
	export let xScale: any;
	export let xValue: (value: AlcoholChartBar) => string;
	export let yScale: any;
	export let yValue: (value: AlcoholChartBar) => number;

	const filteredData = alcoholChartData.filter(({ beverages }) => beverages);

	const totalBeverages = filteredData.reduce((acc, { beverages }) => acc + beverages, 0);
	const alcoholicBeverages = filteredData
		.filter(({ value }) => value > 0.5)
		.reduce((acc, { beverages }) => acc + beverages, 0);
	const totalAlcohol = filteredData.reduce((acc, curr) => acc + curr.beverages * curr.value, 0);
	const totalAlcoholWithoutNonAlcoholicBeverages = filteredData
		.filter(({ value }) => value > 0.5)
		.reduce((acc, curr) => acc + curr.beverages * curr.value, 0);

	const average = +(totalAlcohol / totalBeverages).toPrecision(2);
	const averageWithoutNonAlcoholicBeverages = +(
		totalAlcoholWithoutNonAlcoholicBeverages / alcoholicBeverages
	).toPrecision(2);

	let isBarLabelVisible = false;
	let activeBar;

	function showLabel(e) {
		isBarLabelVisible = true;
		activeBar = filteredData[e.target.dataset.index];
	}

	function hideLabel() {
		isBarLabelVisible = false;
	}

	function setHorintalPosition(bar) {
		return xScale(xValue(bar) || '') - xScale.bandwidth() / 2;
	}

	function setVerticalPosition(bar) {
		return yScale(yValue(bar));
	}
</script>

<g>
	{#each filteredData as bar, index}
		<rect
			data-index={index}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(yValue(bar))}
			x={setHorintalPosition(bar)}
			y={setVerticalPosition(bar)}
			class:average={bar.value === average}
			class:averageWithoutNonAlcoholicBeverages={bar.value === averageWithoutNonAlcoholicBeverages}
			on:focus={showLabel}
			on:mouseover={showLabel}
			on:mouseleave={hideLabel}
		/>
	{/each}
</g>
{#if isBarLabelVisible}
	<Info
		average={activeBar.value === average}
		averageWithoutNonAlcoholicBeverages={activeBar.value === averageWithoutNonAlcoholicBeverages}
		bandwidth={xScale.bandwidth()}
		bar={activeBar}
		x={setHorintalPosition(activeBar)}
		y={setVerticalPosition(activeBar)}
	/>
{/if}

<style>
	rect {
		fill: var(--color-brand-10);
		cursor: pointer;
	}

	rect.average {
		fill: var(--color-brand-6);
	}

	rect.averageWithoutNonAlcoholicBeverages {
		fill: var(--color-brand-3);
	}
</style>
