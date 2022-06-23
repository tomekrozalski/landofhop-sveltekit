<script lang="ts">
	import { translate } from 'svelte-intl';

	import Details from './details.svelte';

	let isDetailsOpened = false;
</script>

<section>
	<header>
		<h3>{$translate('beverage.score')}</h3>
		<ul>
			<li>★</li>
			<li>★</li>
			<li>★</li>
			<li class="nie">★</li>
			<li class="nie">★</li>
		</ul>
	</header>
	{#if isDetailsOpened}
		<Details />
	{/if}
	<button
		class:isDetailsOpened
		on:click={() => {
			isDetailsOpened = !isDetailsOpened;
		}}
		type="button"
	>
		{$translate(`beverage.score.${isDetailsOpened ? 'hideDetails' : 'showDetails'}`)}
	</button>
</section>

<style>
	header {
		border-radius: 0.5rem 0.5rem 0 0;
		padding: 1rem 0 2rem 0;
		background-color: var(--color-brand-6);
		color: var(--color-white);
		text-align: center;
	}

	h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.4rem;
		font-weight: var(--font-weight-regular);
	}

	ul {
		display: flex;
		justify-content: center;
	}

	li {
		font-size: 3rem;
		color: var(--color-white);
	}

	li.nie {
		opacity: 0.3;
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
