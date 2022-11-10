<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	console.log('$page.data.institution', $page.data);

	$: ({ institution, ratingCount } = $page.data);
</script>

{#if institution.statsData.beverages}
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
