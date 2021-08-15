<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { AddTimelineBar } from '$lib/utils/types/Beverage/Stats';
	import type { Sizes } from '$lib/components/stats/utils/Sizes';

	export let addTimelineData: AddTimelineBar[];
	export let sizes: Sizes;

	const { height, margin, width } = sizes.legend;
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	function calculateHorizontalPosition(node, type) {
		const label = node.querySelector('text.label');
		const labelWidth = label.getBBox().width;

		if (type === 'cans') {
			const blockWidth = labelWidth + innerHeight + 10;

			node.style = `transform: translate(${innerWidth - blockWidth}px, 0)`;
		}

		if (type === 'bottles') {
			const blockWidth = labelWidth + innerHeight + 50;
			const cansWidth = document.getElementById('add-timeline-chart-legend-cans').getBBox().width;

			node.style = `transform: translate(${innerWidth - blockWidth - cansWidth}px, 0)`;
		}

		if (type === 'total') {
			const blockWidth = labelWidth + innerHeight + 90;
			const cansWidth = document.getElementById('add-timeline-chart-legend-cans').getBBox().width;
			const bottlesWidth = document.getElementById('add-timeline-chart-legend-bottles').getBBox()
				.width;

			node.style = `transform: translate(${
				innerWidth - blockWidth - cansWidth - bottlesWidth
			}px, 0)`;
		}
	}
</script>

<g style="transform: translate({margin.left}px, {sizes.chart.height + margin.top}px)">
	<g use:calculateHorizontalPosition={'total'} id="add-timeline-chart-legend-total">
		<rect width={innerHeight} height={innerHeight} class="total" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.addTimeline.total')}</text>
			<text class="amount" y="28">
				{addTimelineData.reduce((acc, { bottle, can }) => acc + bottle + can, 0)}
			</text>
		</g>
	</g>
	<g use:calculateHorizontalPosition={'bottles'} id="add-timeline-chart-legend-bottles">
		<rect width={innerHeight} height={innerHeight} class="bottles" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.addTimeline.bottles')}</text>
			<text class="amount" y="28">
				{addTimelineData.reduce((acc, { bottle }) => acc + bottle, 0)}
			</text>
		</g>
	</g>
	<g use:calculateHorizontalPosition={'cans'} id="add-timeline-chart-legend-cans">
		<rect width={innerHeight} height={innerHeight} class="cans" />
		<g style="transform: translate({innerHeight + 10}px, 0)">
			<text class="label" y="12">{$translate('stats.addTimeline.cans')}</text>
			<text class="amount" y="28">{addTimelineData.reduce((acc, { can }) => acc + can, 0)}</text>
		</g>
	</g>
</g>

<style>
	rect.total {
		fill: none;
		stroke: var(--color-total);
		stroke-width: 5;
	}

	rect.bottles {
		fill: none;
		stroke: var(--color-bottle);
		stroke-width: 5;
	}

	rect.cans {
		fill: none;
		stroke: var(--color-can);
		stroke-width: 5;
	}

	text.label {
		font-size: 1.6rem;
	}

	text.amount {
		font-size: 1.2rem;
	}
</style>
