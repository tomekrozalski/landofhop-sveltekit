<script lang="ts">
	import { translations } from 'svelte-intl';
	import CoverImageWrapper from './CoverImageWrapper.svelte';
	import BrokenCoverImage from './BrokenCoverImage.svelte';
	import dictionary from './dictionary.json';
	import type { Basics } from './Basics.d';

	export let beverages: Basics[];

	translations.update(dictionary);
</script>

<ul>
	{#each beverages as beverage, index}
		<li>
			{#if beverage.coverImage}
				{#key beverages}
					<CoverImageWrapper {beverage} eager={index < 5} />
				{/key}
			{:else}
				<a href="/details/{beverage.shortId}/{beverage.brand.badge}/{beverage.badge}">
					<BrokenCoverImage type={beverage.containerType} />
				</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, 160px);
		grid-gap: 1rem;
		justify-content: center;
		align-items: flex-end;
		max-width: var(--size-container-max-width);
		padding: 2rem 1rem;
		margin: 0 auto 6rem auto;
	}

	li {
		display: flex;
		justify-content: center;
		padding-top: 2rem;
		position: relative;
		content-visibility: auto;
		contain-intrinsic-size: 0 35rem;
	}

	a {
		width: 100%;
		text-align: center;
	}

	a > :global(*) {
		transform: scale(1);
		transition: transform var(--transition-default);
	}

	a:hover > :global(*) {
		transform: scale(0.9);
	}

	@media (min-width: 1200px) {
		ul {
			grid-template-columns: repeat(auto-fill, 220px);
		}

		li {
			contain-intrinsic-size: 0 45rem;
		}
	}
</style>
