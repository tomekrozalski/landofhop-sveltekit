<script lang="ts">
	// import { draw } from 'svelte/transition';
	// import { curveCardinal, line } from 'd3-shape';
	import type { TopBrandsTimelineBar } from '$lib/utils/types/stats/General';
	// import sortData from './utils/sortData';

	// export let selectedLine: string | null;
	export let topBrandsTimelineData: TopBrandsTimelineBar[];
	export let xScale: any;
	// export let xValue: (value: any) => string;
	export let yScale: any;

	function getY() {}
</script>

<g style="transform: translate({Math.round(xScale.bandwidth() / 2)}px, 0">
	{#each topBrandsTimelineData as { brands, date }}
		{#each brands.filter(({ amount }) => amount) as { amount, id }}
			<circle cx={xScale(date)} cy={yScale(amount)} r="3" />
		{/each}
	{/each}
</g>

<style>
	circle {
		stroke: #999;
		fill: white;
	}

	/* .top-brand-line-1 {
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
	} */
</style>
