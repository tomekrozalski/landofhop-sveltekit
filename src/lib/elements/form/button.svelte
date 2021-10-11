<script lang="ts">
	import DatabaseIcon from '$lib/elements/vectors/database.svelte';
	import InlineSpinner from './inlineSpinner.svelte';

	export let handleClick: () => void = () => {};
	export let isIrreversible: boolean = false;
	export let isSecondary: boolean = false;
	export let isSubmitting: boolean = false;
	export let type: string = 'button';
	export let disabled: boolean = false;
</script>

<button
	class:isIrreversible
	class:isSecondary
	class:isSubmitting
	{disabled}
	on:click={handleClick}
	{type}
>
	<span><slot /></span>
	{#if isIrreversible}
		<DatabaseIcon />
	{/if}
	{#if isSubmitting}
		<InlineSpinner />
	{/if}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--size-input-height);
		overflow: hidden;
		padding: 0 2rem;
		background-color: var(--color-black);
		color: var(--color-white);
		transition: background-color var(--transition-default), color var(--transition-default);
		cursor: pointer;
		position: relative;
	}

	button.isIrreversible {
		padding-right: 3.4rem;
	}

	button.isIrreversible :global(.icon-database) {
		height: 3rem;
		fill: var(--color-grey-3);
		transition: fill var(--transition-default);
		position: absolute;
		top: -0.4rem;
		right: -0.2rem;
	}

	button:disabled {
		background-color: var(--color-grey-2);
		color: var(--color-grey-4);
		cursor: not-allowed;
	}

	button.isSecondary {
		background-color: var(--color-brand-10);
	}

	button.isSubmitting {
		padding: 0 1rem 0 1.5rem;
		background-color: var(--color-grey-2);
		cursor: not-allowed;
	}

	button:hover:not(:disabled):not(.isSubmitting):not(.isSecondary):not(.isIrreversible) {
		background-color: var(--color-grey-2);
		color: var(--color-black);
	}

	button.isIrreversible:hover {
		background-color: var(--color-grey-4);
		color: var(--color-black);
	}

	button.isIrreversible:hover :global(.icon-database) {
		fill: var(--color-black);
	}

	button.isSecondary:hover {
		background-color: var(--color-brand-10-light);
		color: var(--color-black);
	}

	span {
		white-space: nowrap;
	}

	span::first-letter {
		text-transform: capitalize;
	}
</style>
