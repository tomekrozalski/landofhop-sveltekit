<script lang="ts">
	import StatusIndicator from './StatusIndicator.svelte';
	import Error from './Error.svelte';

	export let errors: string;
	export let focusOnMount: boolean = false;
	export let handleChange: (e: Event) => void;
	export let hasInvertedColors: boolean = false;
	export let id: string | null = null;
	export let isDisabled: boolean = false;
	export let isTextarea: boolean = false;
	export let isTouched: boolean;
	export let fieldName: string;
	export let onEnter: () => void | null = () => null;
	export let style: string = '';
	export let type: 'email' | 'number' | 'password' | 'text' = 'text';
	export let withStatusIndicator: boolean = false;
	export let value: string | null;
	$: disabled = isDisabled || value === null;

	function dispatchKeydown(e) {
		if (onEnter && e.key === 'Enter') {
			e.preventDefault();
			onEnter();
		}
	}

	function listenOnKeydown(node: any) {
		node.addEventListener('keydown', dispatchKeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', dispatchKeydown);
			}
		};
	}

	function typeAction(node: any) {
		node.type = type;
	}

	function focus(node: any) {
		if (focusOnMount) {
			node.focus();
		}
	}
</script>

<StatusIndicator {disabled} {isTouched} isValid={!errors} {style} {withStatusIndicator}>
	{#if isTextarea}
		<textarea
			class:isTouched
			{disabled}
			{id}
			name={fieldName}
			on:change={handleChange}
			use:focus
			use:listenOnKeydown
			{value}
		/>
	{:else}
		<input
			class:hasInvertedColors
			class:isTouched
			{disabled}
			{id}
			name={fieldName}
			use:focus
			use:listenOnKeydown
			use:typeAction
			on:change={handleChange}
			{value}
		/>
	{/if}
	{#if errors}
		<Error>{errors}</Error>
	{/if}
</StatusIndicator>

<style>
	input,
	textarea {
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

	textarea {
		height: 12rem;
		padding: 0.6rem 1rem;
		line-height: 2.6rem;
	}

	input:disabled,
	textarea:disabled {
		border-bottom: none;
		background-color: var(--color-grey-5);
		color: var(--color-grey-2);
		cursor: not-allowed;
		-moz-appearance: textfield;
	}

	textarea:disabled {
		resize: none;
	}

	input.isTouched,
	textarea.isTouched {
		padding-right: 2.6rem;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-bottom-color: var(--color-black);
	}

	input.hasInvertedColors {
		background-color: var(--color-white);
	}
</style>
