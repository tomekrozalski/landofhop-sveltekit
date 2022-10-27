<script lang="ts">
	import { translate } from 'svelte-intl';
	import { format } from 'date-fns';
	import pl from 'date-fns/locale/pl/index.js';
	// import type { AddTimelineBar } from '../utils/normalizers/Output.d';

	type AddTimelineBar = any;

	export let timelineData: any[];
	// export let isBarSelected: boolean = false;
	export let innerHeight: number;
	export let innerWidth: number;
	// export let selectedLine: 'bottles' | 'cans' | 'total' | null;
	const selectedLine = 'bottles';
	export let xScale: any;
	export let xValue: (value: AddTimelineBar) => string;
	export let yScale: any;

	const total = (d: AddTimelineBar) => d.beverages?.length ?? 0;

	let info: AddTimelineBar | null = null;

	function showInfo(bar: AddTimelineBar) {
		info = { ...bar, date: format(new Date(bar.date), 'LLLL yyyy', { locale: pl }) };
		// isBarSelected = true;
	}

	function hideInfo() {
		info = null;
		// isBarSelected = false;
	}

	const yValue = (d: any) => d.beverages?.length;

	function setHorintalPosition(bar: any) {
		return xScale(xValue(bar) || '');
	}

	function setVerticalPosition(bar: any) {
		return yScale(yValue(bar));
	}
</script>

<g class="wrapper" class:muted={!!selectedLine}>
	{#each timelineData as bar}
		<rect
			on:mouseenter={() => showInfo(bar)}
			on:mouseleave={() => hideInfo()}
			class="bottle"
			width={xScale.bandwidth()}
			height={innerHeight - yScale(yValue(bar))}
			x={setHorintalPosition(bar)}
			y={setVerticalPosition(bar)}
		/>
	{/each}
	{#if info}
		<text x={innerWidth / 2} y="30" text-anchor="middle">
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
		fill: blue;
	}

	text {
		font: var(--font-weight-regular) 1.2rem / 1 var(--font-primary);
		font-size: 1.8rem;
	}
</style>
