<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import Markdown from '$lib/atoms/Markdown.svelte';

	$: ({ averageScoreForAllBeverages, institution, ratingCount } = $page.data);
	$: ({ avrScore, points } = institution.statsData);

	$: average = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages);

	$: higher = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages + 0.65);

	$: lower = new Intl.NumberFormat('pl', {
		maximumSignificantDigits: 3
	}).format(averageScoreForAllBeverages - 0.21);
</script>

<div>
	<ul>
		{#if avrScore}
			<li>
				{$translate('brand.ratings.average')}:
				<strong>{avrScore.value}</strong>
				<span>({avrScore.ranking} miejsce na {ratingCount})</span>
			</li>
		{/if}
		<li>
			{$translate('brand.ratings.points')}:
			<strong>{points.value}</strong>
		</li>
	</ul>
	<p><Markdown value={$translate('brand.pointsInfo', { average, higher, lower })} /></p>
	<a href="/brands">Zobacz wszystkie marki</a>
</div>

<style>
	span {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}

	p {
		max-width: 60rem;
		text-align: justify;
	}

	p :global(code) {
		font-family: monospace;
		font-size: 1.5rem;
		background-color: var(--color-grey-4);
	}

	a {
		font-size: 1.6rem;
		color: var(--color-black);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
