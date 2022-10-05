<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { LinkData } from '$lib/utils/types/Beverage/LinkData';
	import LeftIcon from '$lib/atoms/vectors/Left.svelte';
	import RightIcon from '$lib/atoms/vectors/Right.svelte';

	export let next: LinkData | null;
	export let previous: LinkData | null;
</script>

<nav>
	{#if next}
		<a data-sveltekit-prefetch="" href="/details/{next.shortId}/{next.brand}/{next.badge}">
			<LeftIcon>{$translate('beverage.aside.next')}</LeftIcon>
		</a>
	{:else}
		<span>
			<LeftIcon>{$translate('beverage.aside.next')}</LeftIcon>
		</span>
	{/if}
	{#if previous}
		<a
			data-sveltekit-prefetch=""
			href="/details/{previous.shortId}/{previous.brand}/{previous.badge}"
		>
			<RightIcon>{$translate('beverage.aside.previous')}</RightIcon>
		</a>
	{:else}
		<span>
			<RightIcon>{$translate('beverage.aside.previous')}</RightIcon>
		</span>
	{/if}
</nav>

<style>
	nav {
		grid-area: navigation;
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	a,
	span {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
		overflow: hidden;
		border: 1px solid var(--color-grey-3);
		background-color: var(--color-grey-4);
		transition: background-color var(--transition-default);
		position: relative;
	}

	nav :global(svg) {
		width: 2.6rem;
		transition: fill var(--transition-default), transform var(--transition-default);
	}

	a :global(svg) {
		fill: var(--color-success);
	}

	span :global(svg) {
		fill: var(--color-grey-2);
	}

	a:hover {
		background-color: var(--color-warning);
	}

	a:hover :global(svg) {
		fill: var(--color-white);
		transform: scale(2.5);
	}

	@media (--md) {
		nav {
			justify-content: flex-end;
		}
	}

	@media (--lg) {
		nav {
			justify-content: center;
			margin-top: 0;
			margin-bottom: 0;
			padding: 0 1rem 1rem 1rem;
		}

		a,
		span {
			flex-grow: 0;
			width: 5rem;
			margin: 1rem;
			border: 0;
			border-radius: 50%;
			background-color: var(--color-white);
		}
	}
</style>
