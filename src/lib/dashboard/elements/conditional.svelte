<script lang="ts">
	import CheckmarkIcon from '$lib/elements/vectors/success.svelte';

	export let initialValue: string[];
	export let fieldName: string;
	export let updateField: (string, any) => void;
	export let value: string[] | null;

	function onInputClick() {
		updateField(fieldName, value ? null : initialValue);
	}
</script>

<div on:click={onInputClick} class:on={value}>
	<input type="checkbox" readonly />
	{#if value}
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

	div :global(svg) {
		width: 2rem;
		position: absolute;
		top: 1.3rem;
		left: 0.8rem;
		pointer-events: none;
	}

	div :global(svg path) {
		fill: var(--color-black);
	}
</style>
