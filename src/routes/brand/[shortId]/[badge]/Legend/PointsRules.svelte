<script lang="ts">
	import { slide } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import Markdown from '$lib/atoms/Markdown.svelte';

	$: ({ averageScoreForAllBeverages } = $page.data);

	$: average = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages);

	$: higher = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages + 0.65);

	$: lower = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages - 0.21);

	let isPointsInfoOpen = false;

	const togglePointsInfo = () => {
		isPointsInfoOpen = !isPointsInfoOpen;
	};
</script>

{#if isPointsInfoOpen}
	<div transition:slide>
		<Markdown value={$translate('brand.pointsInfo', { average, higher, lower })} />
	</div>
{/if}
<button style="display: block" on:click={togglePointsInfo}>
	{$translate(isPointsInfoOpen ? 'brand.hidePointsRules' : 'brand.showPointsRules')}
</button>

<style>
	div :global(p) {
		max-width: 60rem;
		text-align: justify;
	}

	div :global(code) {
		font-family: monospace;
		font-size: 1.5rem;
		background-color: var(--color-grey-4);
	}

	button {
		padding: 0.5rem 1.5rem;
		align-self: flex-end;
		font-size: 1.6rem;
		color: var(--color-black);
		background-color: var(--color-grey-5);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	button:hover {
		color: var(--color-white);
		background-color: var(--color-brand-6);
	}
</style>
