<script lang="ts">
	import { translate } from 'svelte-intl';
	import { format } from 'date-fns';
	import pl from 'date-fns/locale/pl/index.js';
	import type { AddTimelineBar } from '$types/stats/General';

	export let addTimelineData: AddTimelineBar[];
	export let isBarSelected: boolean = false;
	export let innerHeight: number;
	export let innerWidth: number;
	export let selectedLine: 'bottles' | 'cans' | 'total' | null;
	export let xScale: any;
	export let xValue: (value: AddTimelineBar) => string;
	export let yScale: any;

	const bottles = (d: AddTimelineBar) => d.bottle;
	const cans = (d: AddTimelineBar) => d.can;
	const total = (d: AddTimelineBar) => d.bottle + d.can;

	let info: AddTimelineBar | null = null;

	function showInfo(bar: AddTimelineBar) {
		info = { ...bar, date: format(new Date(bar.date), 'LLLL yyyy', { locale: pl }) };
		isBarSelected = true;
	}

	function hideInfo() {
		info = null;
		isBarSelected = false;
	}
</script>

<g class="wrapper" class:muted={!!selectedLine}>
	{#each addTimelineData as bar}
		<g
			class="barGroup"
			style="transform: translate({xScale(xValue(bar)) || ''}px, {yScale(total(bar))}px)"
			on:mouseenter={() => showInfo(bar)}
			on:mouseleave={() => hideInfo()}
		>
			<rect class="can" width={xScale.bandwidth()} height={innerHeight - yScale(cans(bar))} />
			<rect
				class="bottle"
				width={xScale.bandwidth()}
				height={innerHeight - yScale(bottles(bar))}
				y={innerHeight - yScale(cans(bar))}
			/>
		</g>
	{/each}
	{#if info}
		<text class="label" x={innerWidth / 2} y="30" text-anchor="middle">
			{$translate('stats.general.addTimeline.depiction', info)}
		</text>
	{/if}
</g>

<style>
	g.wrapper {
		opacity: 1;
		transition: opacity var(--transition-default);
	}

	g.muted {
		opacity: 0.35;
	}

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
