<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { AddTimelineBar } from '$lib/utils/types/stats/General';
	import type { Sizes } from '$lib/components/stats/general/utils/Sizes';

	export let addTimelineData: AddTimelineBar[];
	export let selectedLine: 'bottles' | 'cans' | 'total' | null;
	export let sizes: Sizes;

	const { height, margin, width } = sizes.legend;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	function calculateHorizontalPosition(node: any, type: any) {
		const label = node.querySelector('text.label');
		const labelWidth = label.getBBox().width;

		if (type === 'cans') {
			const blockWidth = labelWidth + innerHeight + 10;

			node.style = `transform: translate(${innerWidth - blockWidth}px, 0)`;
		}

		if (type === 'bottles') {
			const blockWidth = labelWidth + innerHeight + 50;
			// @ts-ignore
			const cansWidth = document.getElementById('add-timeline-chart-legend-cans').getBBox().width;

			node.style = `transform: translate(${innerWidth - blockWidth - cansWidth}px, 0)`;
		}

		if (type === 'total') {
			const blockWidth = labelWidth + innerHeight + 90;
			// @ts-ignore
			const cansWidth = document.getElementById('add-timeline-chart-legend-cans').getBBox().width;
			// @ts-ignore
			const bottlesWidth = document.getElementById('add-timeline-chart-legend-bottles').getBBox()
				.width;

			node.style = `transform: translate(${
				innerWidth - blockWidth - cansWidth - bottlesWidth
			}px, 0)`;
		}
	}
</script>

<g style="transform: translate({margin.left}px, {sizes.chart.height + margin.top}px)">
	<g
		use:calculateHorizontalPosition={'total'}
		id="add-timeline-chart-legend-total"
		class:highlighted={selectedLine && selectedLine === 'total'}
		class:muted={selectedLine && selectedLine !== 'total'}
	>
		<rect width={innerHeight} height={innerHeight} class="total" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.general.addTimeline.total')}</text>
			<text class="amount" y="28">
				{addTimelineData.reduce((acc, { bottle, can }) => acc + bottle + can, 0)}
			</text>
		</g>
	</g>
	<g
		use:calculateHorizontalPosition={'bottles'}
		id="add-timeline-chart-legend-bottles"
		class:highlighted={selectedLine && selectedLine === 'bottles'}
		class:muted={selectedLine && selectedLine !== 'bottles'}
	>
		<rect width={innerHeight} height={innerHeight} class="bottles" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.general.addTimeline.bottles')}</text>
			<text class="amount" y="28">
				{addTimelineData.reduce((acc, { bottle }) => acc + bottle, 0)}
			</text>
		</g>
	</g>
	<g
		use:calculateHorizontalPosition={'cans'}
		id="add-timeline-chart-legend-cans"
		class:highlighted={selectedLine && selectedLine === 'cans'}
		class:muted={selectedLine && selectedLine !== 'cans'}
	>
		<rect width={innerHeight} height={innerHeight} class="cans" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.general.addTimeline.cans')}</text>
			<text class="amount" y="28">{addTimelineData.reduce((acc, { can }) => acc + can, 0)}</text>
		</g>
	</g>
</g>

<style>
	rect {
		fill: transparent;
		transition: fill var(--transition-default);
		stroke-width: 5;
	}

	rect.total {
		stroke: var(--color-total);
	}

	rect.bottles {
		stroke: var(--color-bottle);
	}

	rect.cans {
		stroke: var(--color-can);
	}

	text.label {
		font-size: 1.6rem;
	}

	text.amount {
		font-size: 1.2rem;
	}

	g.highlighted rect.total {
		fill: var(--color-total);
	}

	g.highlighted rect.bottles {
		fill: var(--color-bottle);
	}

	g.highlighted rect.cans {
		fill: var(--color-can);
	}

	g.muted {
		opacity: 0.2;
	}
</style>
