<script lang="ts">
	import SuccessIcon from '$lib/elements/vectors/success.svelte';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';

	export let disabled: boolean = false;
	export let isTouched: boolean, isValid: boolean;
	export let style: string = '';
</script>

{#if disabled}
	<slot />
{:else}
	<span {style}>
		{#if isTouched && isValid}
			<SuccessIcon />
		{:else if isTouched && !isValid}
			<WarningIcon />
		{/if}
		<slot />
	</span>
{/if}

<style>
	span {
		display: block;
		width: 100%;
		position: relative;
	}

	span :global(svg) {
		display: inline-block;
		position: absolute;
		top: calc(var(--size-input-height) / 2);
		transform: translateY(-50%);
	}

	span :global(svg.icon-success) {
		width: 1.4rem;
		height: 1.1rem;
		fill: var(--color-success);
		right: 0.6rem;
	}

	span :global(svg.icon-warning) {
		width: 1.4rem;
		height: 1.3rem;
		fill: var(--color-warning);
		right: 0.8rem;
	}
</style>
