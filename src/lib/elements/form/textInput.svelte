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
		class:isTouched
		{id}
		use:typeAction
		data-name={fieldName}
		bind:value={$formStore.fields[fieldName].value}
		on:blur={formStore.onBlur}
	/>
	{#if errorMessage}
		<span>{errorMessage}</span>
	{/if}
</StatusIndicator>

<style>
	input {
		display: block;
		width: 100%;
		height: var(--size-input-height);
		border: 0;
		border-bottom: 1px solid var(--color-grey-2);
		padding: 0.4rem 1rem 0 1rem;
		box-shadow: none;
		background-color: var(--color-grey-4);
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
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

	span {
		padding: 0.2rem 0.5rem;
		font-size: 1rem;
		line-height: 1.2rem;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		transform: translateY(100%);
		background-color: var(--color-brand-5-light);
	}

	@media (--lg) {
		span {
			padding: 0.6rem 1rem 1rem 1rem;
			font-size: 1.4rem;
			line-height: 1.8rem;
		}
	}
</style>
