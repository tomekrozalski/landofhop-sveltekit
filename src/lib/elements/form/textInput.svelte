<script lang="ts">
	import StatusIndicator from './statusIndicator.svelte';
	import Error from './error.svelte';

	export let errors: string;
	export let handleChange: () => void;
	export let hasInvertedColors: boolean = false;
	export let id: string;
	export let isTouched: boolean;
	export let name: string;
	export let type: 'email' | 'number' | 'password' | 'text' = 'text';
	export let value: string;

	function typeAction(node: any) {
		node.type = type;
	}
</script>

<StatusIndicator {isTouched} isValid={!errors}>
	<input
		class:hasInvertedColors
		class:isTouched
		{id}
		{name}
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
