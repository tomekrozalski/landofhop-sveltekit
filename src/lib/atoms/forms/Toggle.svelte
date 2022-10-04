<script lang="ts">
	import CloseIcon from '$lib/atoms/vectors/Close.svelte';
	import SuccessIcon from '$lib/atoms/vectors/Success.svelte';

	export let fieldName: string;
	export let id: string;
	export let updateField: (name: String, value: boolean) => void;
	export let value: boolean | null;

	function handleClick() {
		updateField(fieldName, !value);
	}
</script>

<input
	checked={!!value}
	disabled={value === null}
	{id}
	name={fieldName}
	on:click={handleClick}
	type="checkbox"
/>

<button disabled={value === null} type="button" on:click={handleClick}>
	<CloseIcon />
	<SuccessIcon />
	<div class:isActive={!!value} />
</button>

<style>
	input {
		display: none;
	}

	button {
		display: flex;
		width: calc(var(--size-input-height) * 2);
		height: var(--size-input-height);
		background-color: var(--color-grey-5);
		padding: 0;
		position: relative;
	}

	button:disabled {
		cursor: not-allowed;
	}

	button :global(.icon-close),
	button :global(.icon-success) {
		fill: var(--color-grey-5);
		position: absolute;
		z-index: 1;
	}

	button :global(.icon-close) {
		width: 1.5rem;
		top: 1rem;
		left: 1rem;
	}

	button :global(.icon-success) {
		width: 2rem;
		top: 1rem;
		right: 0.6rem;
	}

	div {
		display: inline-block;
		width: var(--size-input-height);
		height: var(--size-input-height);
		background-color: var(--color-danger-light);
		position: absolute;
		top: 0;
		left: 0;
		transition: left var(--transition-default);
	}

	button:disabled div {
		background-color: var(--color-grey-3);
	}

	.isActive {
		background-color: var(--color-success);
		left: var(--size-input-height);
	}
</style>
