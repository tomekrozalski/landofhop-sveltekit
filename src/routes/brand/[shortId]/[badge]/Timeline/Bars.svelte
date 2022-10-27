<script lang="ts">
	import type { ScaleBand, ScaleLinear } from 'd3-scale';
	import type { BrandTimelineData } from '../types.d';

	export let innerHeight: number;
	export let selectedBar: BrandTimelineData | null;
	export let timelineData: BrandTimelineData[];
	export let xScale: ScaleBand<string>;
	export let yScale: ScaleLinear<number, number, never>;
	export let xValue: (value: BrandTimelineData) => string;

	const yValue = (d: BrandTimelineData) => d.beverages?.length ?? 0;

	function setHorintalPosition(bar: BrandTimelineData) {
		return xScale(xValue(bar) || '');
	}

	function setVerticalPosition(bar: BrandTimelineData) {
		return yScale(yValue(bar));
	}
</script>

<g>
	{#each timelineData as bar}
		<rect
			class:highlighted={selectedBar?.date === bar.date}
			on:click={() => {
				selectedBar = bar;
			}}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(yValue(bar))}
			x={setHorintalPosition(bar)}
			y={setVerticalPosition(bar)}
		/>
	{/each}
</g>

<style>
	rect {
		fill: var(--color-brand-6);
		transition: fill var(--transition-default);
		cursor: pointer;
	}

	rect.highlighted {
		fill: var(--color-brand-10);
	}
</style>
