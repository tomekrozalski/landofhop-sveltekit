<script lang="ts">
	import StatusIndicator from './statusIndicator.svelte';

	export let formStore: any, fieldName: string;
	let { hasInvertedColors, id, type } = $formStore.fields[fieldName];
	$: errorMessage = $formStore.fields[fieldName].errorMessage;
	$: isValid = $formStore.fields[fieldName].isValid;
	$: isTouched = $formStore.fields[fieldName].isTouched;

	function typeAction(node: any) {
		node.type = type;
	}
</script>

<StatusIndicator {isTouched} {isValid}>
	<input
		class:hasInvertedColors
		{id}
		use:typeAction
		data-name={fieldName}
		bind:value={$formStore.fields[fieldName].value}
		on:blur={formStore.onBlur}
	/>
	{#if errorMessage}
		{errorMessage}
	{/if}
</StatusIndicator>

<style>
	input {
		display: block;
		width: 100%;
		height: var(--size-input-height);
		border: 0;
		border-bottom: 1px solid var(--color-grey-2);
		padding: 1px 1rem 0 1rem;
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
