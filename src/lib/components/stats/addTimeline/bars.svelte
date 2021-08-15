<script lang="ts">
	import type { AddTimelineBar } from '$lib/utils/types/Beverage/Stats';

	export let addTimelineData: AddTimelineBar[];
	export let innerHeight: number;
	export let xScale: any;
	export let xValue: (value: AddTimelineBar) => string;
	export let yScale: any;

	const bottles = (d: AddTimelineBar) => d.bottle;
	const cans = (d: AddTimelineBar) => d.can;
	const total = (d: AddTimelineBar) => d.bottle + d.can;
</script>

<g>
	{#each addTimelineData as bar}
		<g
			class="barGroup"
			style="transform: translate({xScale(xValue(bar)) || ''}px, {yScale(total(bar))}px)"
		>
			<rect class="can" width={xScale.bandwidth()} height={innerHeight - yScale(cans(bar))} />
			<rect
				class="bottle"
				width={xScale.bandwidth()}
				height={innerHeight - yScale(bottles(bar))}
				y={innerHeight - yScale(cans(bar))}
			/>
		</g>

		<!-- <rect
			data-index={index}
			width={xScale.bandwidth()}
			height={innerHeight - yScale(yValue(bar))}
			x={setHorintalPosition(bar)}
			y={setVerticalPosition(bar)}
			class:average={bar.value === average}
			class:averageWithoutNonAlcoholicBeverages={bar.value === averageWithoutNonAlcoholicBeverages}
			on:mouseover={showLabel}
			on:mouseleave={hideLabel}
		/> -->
	{/each}
</g>

<style>
	g.barGroup {
		opacity: 0.25;
		transition: opacity var(--transition-default);
		cursor: pointer;
	}

	g.barGroup:hover {
		opacity: 1;
	}

	rect.can {
		fill: var(--color-can);
	}

	rect.bottle {
		fill: var(--color-bottle);
	}
</style>
