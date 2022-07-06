<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import RatingDetails from './ratingDetails.svelte';
	import Stars from './stars.svelte';

	export let details: Details;
	let isDetailsOpened = false;

	const { total } = details.ratings;
</script>

<section>
	<header class:isDetailsOpened>
		<h3>{$translate('beverage.rating')}</h3>
		<Stars score={total.value} />
	</header>
	{#if isDetailsOpened}
		<RatingDetails {details} />
	{/if}
	<button
		class:isDetailsOpened
		on:click={() => {
			isDetailsOpened = !isDetailsOpened;
		}}
		type="button"
	>
		{$translate(`beverage.rating.${isDetailsOpened ? 'hideDetails' : 'showDetails'}`)}
	</button>
</section>

<style>
	header {
		border-radius: 0.5rem 0.5rem 0 0;
		padding: 1rem 0 2rem 0;
		background-color: var(--color-brand-6);
		color: var(--color-white);
		text-align: center;
		position: relative;
		cursor: pointer;
	}

	header.isDetailsOpened :global(strong),
	header:hover :global(strong) {
		opacity: 1;
	}

	header.isDetailsOpened :global(ul),
	header:hover :global(ul) {
		opacity: 0;
	}

	h3 {
		margin: 0 0 1rem 0;
		font-size: 1.4rem;
		font-weight: var(--font-weight-regular);
	}

	button {
		display: block;
		width: 100%;
		border-radius: 0 0 0.5rem 0.5rem;
		background-color: var(--color-grey-5);
		transition: background-color var(--transition-default);
		font-size: 1.5rem;
		text-align: center;
	}

	button.isDetailsOpened {
		background-color: var(--color-brand-6);
		color: var(--color-white);
	}

	button:hover {
		background-color: var(--color-grey-4);
	}

	button.isDetailsOpened:hover {
		background-color: var(--color-brand-8);
	}
</style>
