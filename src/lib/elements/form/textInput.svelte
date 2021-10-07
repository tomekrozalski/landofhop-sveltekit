<script lang="ts">
	import StatusIndicator from './statusIndicator.svelte';
	import Error from './error.svelte';

	export let errors: string;
	export let handleChange: () => void;
	export let hasInvertedColors: boolean = false;
	export let id: string;
	export let isTouched: boolean;
	export let fieldName: string;
	export let style: string = '';
	export let type: 'email' | 'number' | 'password' | 'text' = 'text';
	export let value: string;
	$: disabled = value === null;

	function typeAction(node: any) {
		node.type = type;
	}
</script>

<StatusIndicator {disabled} {isTouched} isValid={!errors} {style}>
	<input
		class:hasInvertedColors
		class:isTouched
		{disabled}
		{id}
		name={fieldName}
		use:typeAction
		on:change={handleChange}
		bind:value
	/>
	{#if errors}
		<Error>{errors}</Error>
	{/if}
</StatusIndicator>

<style>
	input {
		display: block;
		width: 100%;
		height: var(--size-input-height);
		border: 0;
		border-bottom: 1px solid var(--color-grey-2);
		padding: 0 1rem;
		background-color: var(--color-grey-4);
		font: var(--font-weight-light) 1.8rem / 1 var(--font-primary);
		color: var(--color-black);
	}

	input:disabled {
		border-bottom: none;
		background-color: var(--color-grey-5);
		cursor: not-allowed;
	}

	input.isTouched {
		padding-right: 2.6rem;
	}

	input:focus {
		outline: none;
		border-bottom-color: var(--color-black);
	}

	input.hasInvertedColors {
		background-color: var(--color-white);
	}
</style>
