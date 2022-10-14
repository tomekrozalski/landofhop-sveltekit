<script lang="ts">
	import { draw } from 'svelte/transition';
	import { curveBasis, line } from 'd3-shape';
	import type { AddTimelineBar } from '../utils/normalizers/Output.d';

	export let addTimelineData: AddTimelineBar[];
	export let isBarSelected: boolean = false;
	export let selectedLine: 'bottles' | 'cans' | 'total' | null;
	export let xScale: any;
	export let xValue: (value: AddTimelineBar) => string;
	export let yScale: any;

	const bottles = (d: AddTimelineBar) => d.bottle;
	const cans = (d: AddTimelineBar) => d.can;
	const total = (d: AddTimelineBar) => d.bottle + d.can;

	const linePath = (type: any) =>
		line<AddTimelineBar>()
			.x((d: any) => xScale(xValue(d)) || 0)
			.y((d: any) => yScale(type(d)))
			.curve(curveBasis);
</script>

<g
	style="transform: translate({Math.round(xScale.bandwidth() / 2)}px, 0)"
	class:muted={isBarSelected}
>
	<path
		class="line bottles"
		class:muted={selectedLine && selectedLine !== 'bottles'}
		d={linePath(bottles)(addTimelineData)}
		in:draw
		on:mouseenter={() => (selectedLine = 'bottles')}
		on:mouseleave={() => (selectedLine = null)}
	/>
	<path
		class="line cans"
		class:muted={selectedLine && selectedLine !== 'cans'}
		d={linePath(cans)(addTimelineData)}
		in:draw
		on:mouseenter={() => (selectedLine = 'cans')}
		on:mouseleave={() => (selectedLine = null)}
	/>
	<path
		class="line total"
		class:muted={selectedLine && selectedLine !== 'total'}
		d={linePath(total)(addTimelineData)}
		in:draw
		on:mouseenter={() => (selectedLine = 'total')}
		on:mouseleave={() => (selectedLine = null)}
	/>
</g>

<style>
	path.total {
		stroke: var(--color-total);
	}

	path.bottles {
		stroke: var(--color-bottle);
	}

	path.cans {
		stroke: var(--color-can);
	}

	.muted {
		opacity: 0.2;
	}
</style>
