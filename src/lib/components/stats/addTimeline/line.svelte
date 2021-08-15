<script lang="ts">
	import { draw } from 'svelte/transition';
	import { curveBasis, line } from 'd3-shape';
	import type { AddTimelineBar } from '$lib/utils/types/Beverage/Stats';

	export let addTimelineData: AddTimelineBar[];
	export let xScale: any;
	export let xValue: (value: AddTimelineBar) => string;
	export let yScale: any;

	const bottles = (d: AddTimelineBar) => d.bottle;
	const cans = (d: AddTimelineBar) => d.can;
	const total = (d: AddTimelineBar) => d.bottle + d.can;

	const linePath = (type) =>
		line()
			.x((d) => xScale(xValue(d)) || 0)
			.y((d) => yScale(type(d)))
			.curve(curveBasis);
</script>

<g style="transform: translate({xScale.bandwidth() / 2}px, 0)">
	<path class="line bottles" d={linePath(bottles)(addTimelineData)} in:draw />
	<path class="line cans" d={linePath(cans)(addTimelineData)} in:draw />
	<path class="line total" d={linePath(total)(addTimelineData)} in:draw />
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
</style>
