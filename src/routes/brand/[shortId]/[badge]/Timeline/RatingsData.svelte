<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ ratingsData } = $page.data);
</script>

{#if ratingsData}
	{@const { avgRating, ratingPlace, ratingCount } = ratingsData}
	<section>
		{$translate('brand.ratings.average')}: <strong>{avgRating}</strong>
		<span>({ratingPlace} miejsce na {ratingCount})</span>
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
