<script lang="ts">
	import type { FieldTypes } from '$lib/utils/types/form';
	import StatusIndicator from './statusIndicator.svelte';

	export let data: FieldTypes;
	let { hasInvertedColors, isRequired, name, type, validateWith } = data;
	$: isTouched = data.isTouched;
	$: isValid = data.isValid;

	function typeAction(node: any) {
		node.type = type;
	}

	function validate() {
		if (validateWith) {
			isValid = !!data.value.match(validateWith);
		} else if (isRequired) {
			isValid = data.value.length > 0;
		}

		isTouched = true;
	}
</script>

<StatusIndicator {isTouched} {isValid}>
	<input
		class:hasInvertedColors
		id={name}
		use:typeAction
		bind:value={data.value}
		on:blur={validate}
	/>
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

	input.hasInvertedColors {
		background-color: var(--color-white);
	}
</style>
