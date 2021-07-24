<script lang="ts">
	import type { InputTypeTypes } from '$lib/utils/types/form';
	import StatusIndicator from './statusIndicator.svelte';

	export let name: string,
		type: InputTypeTypes = 'text',
		isInverted: boolean = false,
		value: string;

	let isTouched = true;
	let isValid = true;

	function typeAction(node: any) {
		node.type = type;
	}
</script>

<StatusIndicator {isTouched} {isValid}>
	<input class:isInverted id={name} use:typeAction bind:value />
</StatusIndicator>

<style>
	input {
		display: block;
		width: 100%;
		height: var(--size-input-height);
		border: 0;
		border-bottom: 1px solid var(--color-grey-2);
		padding: 0 1rem;
		box-shadow: none;
		background-color: var(--color-grey-4);
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
		color: var(--color-black);
	}

	input:focus {
		outline: none;
		border-bottom-color: var(--color-black);
	}

	input.isInverted {
		background-color: var(--color-white);
	}
</style>
