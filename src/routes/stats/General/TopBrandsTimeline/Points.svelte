<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import { format } from 'date-fns';
	import pl from 'date-fns/locale/pl/index.js';
	import type { Brand, TopBrandsTimelineBar } from '$types/stats/General';

	export let selectedBrand: string | null;
	export let topBrandsTimelineData: TopBrandsTimelineBar[];
	export let xScale: any;
	export let yScale: any;

	let selectedDate: string | null;

	function getSelectedDateVelue() {
		const selectedDateData = topBrandsTimelineData.find(
			({ date }) => date === selectedDate
		) as TopBrandsTimelineBar;
		const selectedDateBrand = selectedDateData.brands.find(
			({ id }) => id === selectedBrand
		) as Brand;

		return selectedDateBrand.amount;
	}
</script>

<g style="transform: translate({Math.round(xScale.bandwidth() / 2)}px, 0">
	{#each topBrandsTimelineData as { brands, date }}
		{#each brands.filter(({ amount }) => amount) as { amount, id }, index}
			<circle
				class="top-brand-point-{index + 1}"
				class:hidden={selectedBrand && selectedBrand !== id}
				cx={xScale(date)}
				cy={yScale(amount)}
				r="3"
				in:fade={{ delay: 200 }}
				on:mouseenter={() => {
					selectedBrand = id;
					selectedDate = date;
				}}
				on:mouseleave={() => {
					selectedBrand = null;
					selectedDate = null;
				}}
			/>
		{/each}
	{/each}
</g>
{#if selectedBrand && selectedDate}
	<text class="label" x="200" y="20" text-anchor="middle">
		{$translate('stats.general.topBrandsTimeline.valueLabel', {
			date: format(new Date(selectedDate), 'LLLL yyyy', { locale: pl }),
			value: getSelectedDateVelue()
		})}
	</text>
{/if}

<style>
	circle {
		fill: var(--color-white);
		cursor: pointer;
	}

	.top-brand-point-1 {
		stroke: var(--color-brand-1);
	}

	.top-brand-point-2 {
		stroke: var(--color-brand-3);
	}

	.top-brand-point-3 {
		stroke: var(--color-brand-5);
	}

	.top-brand-point-4 {
		stroke: var(--color-brand-6);
	}

	.top-brand-point-5 {
		stroke: var(--color-brand-8);
	}

	.top-brand-point-6 {
		stroke: var(--color-brand-10);
	}

	.top-brand-point-7 {
		stroke: #555;
	}

	.top-brand-point-8 {
		stroke: #666;
	}

	.top-brand-point-9 {
		stroke: #999;
	}

	.top-brand-point-10 {
		stroke: #ccc;
	}

	.hidden {
		opacity: 0;
	}
</style>
