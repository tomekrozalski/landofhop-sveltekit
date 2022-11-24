<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import PointsRules from './PointsRules.svelte';

	$: ({ institution, ratingCount } = $page.data);
	$: ({ points } = institution.statsData);
</script>

<li>
	<div>
		{$translate('brand.ratings.points')}:
		<strong>{points.value}</strong>
		<span>
			{$translate('brand.ratings.ranking', {
				count: ratingCount,
				rating: points.ranking
			})}
		</span>
	</div>
	<PointsRules />
	<a href="/brands">{$translate('brand.showAllBrands')}</a>
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
	}

	a {
		align-self: flex-start;
		font-size: 1.6rem;
		color: var(--color-black);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
