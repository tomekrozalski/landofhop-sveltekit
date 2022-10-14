<script lang="ts">
	import type { RatingsChartBar } from 'src/routes/stats/General/utils/normalizers/Output';

	export let ratingsChartData: RatingsChartBar[];
	export let innerHeight: number;
	export let xScale: any;
	export let xValue: (value: RatingsChartBar) => string;
	export let yScale: any;
	export let yValue: (value: RatingsChartBar) => number;

	const filteredData = ratingsChartData.filter(({ beverages }) => beverages);
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
		/>
	{/each}
</g>

<style>
	rect {
		fill: var(--color-brand-8);
	}
</style>
