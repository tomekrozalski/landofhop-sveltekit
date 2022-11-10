<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ institution, ratingCount } = $page.data);
</script>

{#if institution.statsData.avrScore}
	<ul>
		<li>
			{$translate('brand.ratings.average')}: <strong>{institution.statsData.avrScore.value}</strong>
			<span>({institution.statsData.avrScore.ranking} miejsce na {ratingCount})</span>
		</li>
		<li>
			{$translate('brand.ratings.points')}: <strong>{institution.statsData.points.value}</strong>
		</li>
	</ul>
{/if}

<a href="/brands">{$translate('brand.showList')}</a>

<style>
	ul {
		margin-inline: 2rem;
	}

	span {
		color: var(--color-grey-1);
	}

	a {
		margin-inline: 2rem;
		font-size: 1.6rem;
		color: var(--color-black);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
