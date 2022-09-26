<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';

	import type { AlcoholChartBar } from '$lib/utils/types/stats/General';

	export let average: boolean;
	export let averageWithoutNonAlcoholicBeverages: boolean;
	export let bandwidth: number;
	export let bar: AlcoholChartBar;
	export let x: number;
	export let y: number;

	function getTextWidth() {
		const textElement = document.getElementById('alcohol-chart-bar-label');
		return textElement.getBBox().width;
	}

	function calculateWidth(node: SVGRectElement) {
		node.style = `width: ${getTextWidth() + 20}px`;
	}

	const calculateHorizontalPosition = () =>
		bar.value > 18 ? x - getTextWidth() - bandwidth * 2 - 10 - 2 : x + bandwidth + 1;

	const calculateVerticalPosition = () => (bar.beverages < 3 ? y - 15 : y);

	function calculatePosition(node: SVGGElement) {
		node.style = `transform: translate(${calculateHorizontalPosition()}px, ${calculateVerticalPosition()}px)`;
	}
</script>

<g use:calculatePosition in:fade>
	<rect use:calculateWidth height="20" />
	<text id="alcohol-chart-bar-label" x="10" y="15">
		{$translate('stats.general.alcohol.barLabel', {
			beverages: bar.beverages,
			value: Intl.NumberFormat('pl').format(bar.value)
		})}
		{#if average}
			{' - '}
			{$translate('stats.general.alcohol.isAverage')}
		{/if}
		{#if averageWithoutNonAlcoholicBeverages}
			{' - '}
			{$translate('stats.general.alcohol.isAverageWithoutNonAlcoholicBeverages')}
		{/if}
	</text>
</g>

<style>
	rect {
		fill: var(--color-black);
	}

	text {
		fill: var(--color-white);
	}
</style>
