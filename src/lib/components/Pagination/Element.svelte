<script lang="ts">
	import { translate } from 'svelte-intl';
	import LeftIcon from '$lib/elements/vectors/Left.svelte';
	import RightIcon from '$lib/elements/vectors/Right.svelte';

	export let action: (e: Event) => void = () => {};
	export let active: boolean = false;
	export let current: boolean = false;
	export let label: string;
	export let tag: string;
</script>

<li>
	<svelte:element
		this={tag}
		class="pagination-element"
		class:active
		class:inactive={!active}
		class:current
		on:click={action}
		{...$$restProps}
	>
		{#if label === '←'}
			<LeftIcon>{$translate('global.pagination.previous')}</LeftIcon>
		{:else if label === '→'}
			<RightIcon>{$translate('global.pagination.next')}</RightIcon>
		{:else}
			{label}
		{/if}
	</svelte:element>
</li>

<style>
	li {
		width: 100%;
		margin: 1rem;
	}

	.pagination-element {
		display: block;
		width: 100%;
		padding: 1rem;
		border: 1px solid var(--color-grey-2);
		background-color: var(--color-grey-2);
		font-size: 1.6rem;
		line-height: 1;
		color: var(--color-white);
		text-align: center;
		cursor: pointer;
	}

	.pagination-element :global(svg) {
		width: 1.2rem;
		height: 1.2rem;
		fill: var(--color-white);
	}

	.pagination-element:hover:not(.inactive),
	.pagination-element:focus:not(.inactive) {
		background-color: var(--color-white);
		color: var(--color-black);
	}

	.pagination-element:focus:not(.inactive) {
		outline: 0.2rem solid var(--color-black);
	}

	.active {
		border-color: var(--color-grey-1);
		background-color: var(--color-grey-4);
		color: var(--color-black);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	.active :global(svg) {
		fill: var(--color-black);
	}

	.inactive {
		cursor: not-allowed;
	}

	.current {
		background: var(--color-black);
		color: var(--color-white);
		border-color: var(--color-black);
	}

	@media (--sm) {
		li {
			width: auto;
			margin: 0.5rem;
		}

		.pagination-element {
			display: inline-block;
			padding: 0.8rem 1.5rem;
		}
	}

	@media (--lg) {
		.pagination-element {
			padding: 0.5rem 1rem;
		}
	}
</style>
