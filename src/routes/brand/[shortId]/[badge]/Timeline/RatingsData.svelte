<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ institution, ratingCount } = $page.data);
</script>

{#if institution.statsData.avrScore}
	<section>
		{$translate('brand.ratings.average')}: <strong>{institution.statsData.avrScore.value}</strong>
		<span>({institution.statsData.avrScore.ranking} miejsce na {ratingCount})</span>
	</section>
{/if}

<style>
	section {
		float: left;
		margin-inline: 2rem;
	}

	span {
		color: var(--color-grey-1);
	}
</style>
