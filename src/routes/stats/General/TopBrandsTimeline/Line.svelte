<script lang="ts">
	import { draw } from 'svelte/transition';
	import { curveCardinal, line } from 'd3-shape';
	import type { TopBrandsTimelineBar } from '$types/stats/General';
	import sortData from './utils/sortData';

	export let selectedBrand: string | null;
	export let topBrandsTimelineData: TopBrandsTimelineBar[];
	export let xScale: any;
	export let xValue: (value: any) => string;
	export let yScale: any;

	const linePath = (id: string) => {
		type DataTypes = {
			amount: number;
			date: string;
		};

		const data: DataTypes[] = topBrandsTimelineData
			.map(({ brands, date }) => ({
				date,
				amount: brands.find((props) => props.id === id)?.amount ?? 0
			}))
			.reduce((acc: DataTypes[], { date, amount }) => {
				if (amount && acc[acc.length - 1]?.amount === 0) {
					return [acc[acc.length - 1], { date, amount }];
				}

				return [...acc, { date, amount }];
			}, []);

		return line<DataTypes>()
			.x((d) => xScale(xValue(d)) || 0)
			.y((d) => yScale(d.amount))
			.curve(curveCardinal)(data);
	};
</script>

<g style="transform: translate({Math.round(xScale.bandwidth() / 2)}px, 0">
	{#each sortData(topBrandsTimelineData) as { id }, index}
		<path
			class="line top-brand-line-{index + 1}"
			class:muted={selectedBrand && selectedBrand !== id}
			d={linePath(id)}
			in:draw
			on:mouseenter={() => (selectedBrand = id)}
			on:mouseleave={() => (selectedBrand = null)}
		/>
	{/each}
</g>

<style>
	path {
		stroke-width: 3;
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
