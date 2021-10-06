<script lang="ts">
	import CheckmarkIcon from '$lib/elements/vectors/success.svelte';

	type ValueType = string | string[];

	export let initialValue: ValueType = '';
	export let fieldName: string;
	export let updateField: (name: string, value: ValueType | null) => void;
	export let validateField: (name: string) => void;
	export let value: ValueType | null;

	function onInputClick() {
		if (value) {
			updateField(fieldName, null);
			validateField(fieldName);
		} else {
			updateField(fieldName, initialValue);
		}
	}
</script>

<div on:click={onInputClick} class:on={value !== null}>
	<input type="checkbox" readonly />
	{#if value !== null}
		<CheckmarkIcon />
	{/if}
</div>

<style>
	div {
		flex-shrink: 0;
		display: inline-block;
		width: var(--size-input-height);
		height: var(--size-input-height);
		background-color: var(--color-grey-5);
		border-bottom: 1px solid var(--color-grey-2);
		position: relative;
		cursor: pointer;
	}

	div.on {
		background-color: var(--color-grey-4);
	}

	input {
		display: none;
	}

	div :global(svg.icon-success) {
		width: 2rem;
		fill: var(--color-black);
		position: absolute;
		top: 1.1rem;
		left: 0.8rem;
		pointer-events: none;
	}
</style>
