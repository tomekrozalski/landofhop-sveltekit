<script lang="ts">
	import { draw } from 'svelte/transition';
	import { curveBasis, line } from 'd3-shape';
	import type { TopBrandsTimelineBar } from '$lib/utils/types/stats/General';
	import sortData from './utils/sortData';

	export let selectedLine: string | null;
	export let topBrandsTimelineData: TopBrandsTimelineBar[];
	export let xScale: any;
	export let xValue: (value: any) => string;
	export let yScale: any;

	const linePath = (id: string) =>
		line<TopBrandsTimelineBar>()
			.x((d: TopBrandsTimelineBar) => xScale(xValue(d)) || 0)
			.y((d: TopBrandsTimelineBar) => yScale(d.brands.find((props) => props.id === id)!.amount))
			.curve(curveBasis);
</script>

{#each sortData(topBrandsTimelineData) as { id }, index}
	<path
		class="line top-brand-line-{index + 1}"
		class:muted={selectedLine && selectedLine !== id}
		d={linePath(id)(topBrandsTimelineData)}
		in:draw
		on:mouseenter={() => (selectedLine = id)}
		on:mouseleave={() => (selectedLine = null)}
	/>
{/each}

<style>
	path {
		/* stroke-width: 3; */
		stroke: #999;
	}

	.top-brand-line-1 {
		stroke: var(--color-brand-1);
	}

	.top-brand-line-2 {
		stroke: var(--color-brand-3);
	}

	.top-brand-line-3 {
		stroke: var(--color-brand-5);
	}

	.top-brand-line-4 {
		stroke: var(--color-brand-6);
	}

	.top-brand-line-5 {
		stroke: var(--color-brand-8);
	}

	.top-brand-line-6 {
		stroke: var(--color-brand-10);
	}

	.top-brand-line-7 {
		stroke: #555;
	}

	.top-brand-line-8 {
		stroke: #666;
	}

	.top-brand-line-9 {
		stroke: #999;
	}

	.top-brand-line-10 {
		stroke: #ccc;
	}

	.muted {
		opacity: 0.2;
	}
</style>
