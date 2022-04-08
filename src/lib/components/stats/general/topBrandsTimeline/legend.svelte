<script lang="ts">
	import type { TopBrandsTimelineBar } from '$lib/utils/types/stats/General';

	export let selectedLine: string | null;
	export let topBrandsTimelineData: TopBrandsTimelineBar[];
</script>

<ol>
	{#each topBrandsTimelineData[topBrandsTimelineData.length - 1].brands as { amount, id, name }, index}
		<li
			class="top-brands-legend-{index + 1}"
			class:highlighted={id === selectedLine}
			on:mouseenter={() => (selectedLine = id)}
			on:mouseleave={() => (selectedLine = null)}
		>
			{name.value} <span>({amount})</span>
		</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0 1rem;
		list-style: none;
		counter-reset: item;
	}

	li {
		counter-increment: item;
		border-radius: 0.8rem;
		cursor: pointer;
	}

	li::before {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 3rem;
		height: 3rem;
		margin-right: 0.4rem;
		border-radius: 0.8rem;
		content: counter(item);
		color: var(--color-white);
	}

	li:not(:last-of-type)::after {
		content: ',';
	}

	.highlighted {
		color: var(--color-white);
	}

	.highlighted::after {
		color: transparent;
	}

	li:last-of-type::after {
		content: '';
		padding-right: 0.8rem;
	}

	.top-brands-legend-1.highlighted,
	.top-brands-legend-1::before {
		background-color: var(--color-brand-1);
	}

	.top-brands-legend-2.highlighted,
	.top-brands-legend-2::before {
		background-color: var(--color-brand-3);
	}

	.top-brands-legend-3.highlighted,
	.top-brands-legend-3::before {
		background-color: var(--color-brand-5);
	}

	.top-brands-legend-4.highlighted,
	.top-brands-legend-4::before {
		background-color: var(--color-brand-6);
	}

	.top-brands-legend-5.highlighted,
	.top-brands-legend-5::before {
		background-color: var(--color-brand-8);
	}

	.top-brands-legend-6.highlighted,
	.top-brands-legend-6::before {
		background-color: var(--color-brand-10);
	}

	.top-brands-legend-7.highlighted,
	.top-brands-legend-7::before {
		background-color: #555;
	}

	.top-brands-legend-8.highlighted,
	.top-brands-legend-8::before {
		background-color: #666;
	}

	.top-brands-legend-9.highlighted,
	.top-brands-legend-9::before {
		background-color: #999;
	}

	.top-brands-legend-10.highlighted,
	.top-brands-legend-10::before {
		background-color: #ccc;
	}

	span {
		font-size: 1.4rem;
		font-weight: var(--font-weight-light);
	}

	@media (--md) {
		ol {
			flex-direction: row;
			flex-wrap: wrap;
			padding: 0 4rem;
		}
	}
</style>
