<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { AddTimelineBar } from '$types/stats/General';

	export let addTimelineData: AddTimelineBar[];
	export let selectedLine: 'bottles' | 'cans' | 'total' | null;
</script>

<ul>
	<li
		class="total"
		class:highlighted={selectedLine === 'total'}
		on:mouseenter={() => (selectedLine = 'total')}
		on:mouseleave={() => (selectedLine = null)}
	>
		{$translate('stats.general.addTimeline.total')}
		<strong>{addTimelineData.reduce((acc, { bottle, can }) => acc + bottle + can, 0)}</strong>
	</li>
	<li
		class="bottles"
		class:highlighted={selectedLine === 'bottles'}
		on:mouseenter={() => (selectedLine = 'bottles')}
		on:mouseleave={() => (selectedLine = null)}
	>
		{$translate('stats.general.addTimeline.bottles')}
		<strong>{addTimelineData.reduce((acc, { bottle }) => acc + bottle, 0)}</strong>
	</li>
	<li
		class="cans"
		class:highlighted={selectedLine === 'cans'}
		on:mouseenter={() => (selectedLine = 'cans')}
		on:mouseleave={() => (selectedLine = null)}
	>
		{$translate('stats.general.addTimeline.cans')}
		<strong>{addTimelineData.reduce((acc, { can }) => acc + can, 0)}</strong>
	</li>
</ul>

<style>
	ul {
		display: flex;
		justify-content: flex-end;
		margin-right: 3.5rem;
	}

	li {
		height: 2.5rem;
		padding-left: 3.5rem;
		font-size: 1.6rem;
		font-weight: var(--font-weight-regular);
		line-height: 1;
		position: relative;
		cursor: pointer;
	}

	li + li {
		margin-left: 1.5rem;
	}

	li::before {
		content: '';
		display: inline-block;
		width: 2.5rem;
		height: 2.5rem;
		border-width: 0.4rem;
		border-style: solid;
		position: absolute;
		top: 0;
		left: 0;
	}

	li.total::before {
		border-color: var(--color-brand-8);
	}

	li.bottles::before {
		border-color: var(--color-brand-6);
	}

	li.cans::before {
		border-color: var(--color-brand-5);
	}

	.total.highlighted::before {
		background-color: var(--color-brand-8);
	}

	.bottles.highlighted::before {
		background-color: var(--color-brand-6);
	}

	.cans.highlighted::before {
		background-color: var(--color-brand-5);
	}

	strong {
		display: block;
		margin-top: 0.3rem;
		font: var(--font-weight-light) 1.2rem / 1 var(--font-primary);
	}

	@media (--md) {
		li {
			height: 3.5rem;
			padding-left: 4.5rem;
		}

		li + li {
			margin-left: 3.5rem;
		}

		li::before {
			width: 3.5rem;
			height: 3.5rem;
			border-width: 0.5rem;
		}
	}
</style>
