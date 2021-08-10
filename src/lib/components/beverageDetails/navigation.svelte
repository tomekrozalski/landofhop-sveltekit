<script lang="ts">
	import { translate } from 'svelte-intl';
	import { next, previous } from '$lib/utils/stores/beverage';
	import LeftIcon from '$lib/elements/vectors/left.svelte';
	import RightIcon from '$lib/elements/vectors/right.svelte';
</script>

<nav>
	{#if $next}
		<a sveltekit:prefetch href={`/details/${$next.shortId}/${$next.brand.badge}/${$next.badge}`}>
			<LeftIcon>{$translate('beverage.aside.next')}</LeftIcon>
		</a>
	{:else}
		<span>
			<LeftIcon>{$translate('beverage.aside.next')}</LeftIcon>
		</span>
	{/if}
	{#if $previous}
		<a
			sveltekit:prefetch
			href={`/details/${$previous.shortId}/${$previous.brand.badge}/${$previous.badge}`}
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
		padding: 1rem;
	}

	a,
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5rem;
		height: 5rem;
		margin: 1rem;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--color-white);
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
		}
	}
</style>
