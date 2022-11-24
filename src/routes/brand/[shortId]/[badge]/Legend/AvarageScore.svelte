<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ institution, ratingCount } = $page.data);
	$: ({ avrScore } = institution.statsData);
</script>

{#if avrScore}
	<li>
		{$translate('brand.ratings.average')}:
		<strong>{avrScore.value}</strong>
		<span>
			{$translate('brand.ratings.ranking', {
				count: ratingCount,
				rating: avrScore.ranking
			})}
		</span>
	</li>
{/if}
