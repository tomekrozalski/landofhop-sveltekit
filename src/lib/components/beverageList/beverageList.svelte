<script lang="ts">
	export let beverages: Basics[];

	import type { Basics } from '$lib/utils/types/Beverage/Basics';
	import CoverImageWrapper from './coverImageWrapper.svelte';
	import BrokenCoverImage from './brokenCoverImage.svelte';
</script>

<ul>
	{#each beverages as beverage}
		<li>
			<a href={`/details/${beverage.shortId}/${beverage.brand.badge}/${beverage.badge}`}>
				{#if beverage.photos?.cover}
					<CoverImageWrapper {beverage} />
				{:else}
					<BrokenCoverImage type={beverage.container.type} />
				{/if}
			</a>
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

	@media (--xl) {
		ul {
			grid-template-columns: repeat(auto-fill, 220px);
		}

		li {
			contain-intrinsic-size: 0 45rem;
		}
	}
</style>
