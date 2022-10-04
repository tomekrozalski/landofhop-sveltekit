<script lang="ts">
	import SuccessIcon from '$lib/atoms/vectors/Success.svelte';
	import WarningIcon from '$lib/atoms/vectors/Warning.svelte';

	export let disabled: boolean = false;
	export let isTouched: boolean, isValid: boolean;
	export let style: string = '';
	export let withStatusIndicator: boolean = false;
</script>

{#if disabled && !withStatusIndicator}
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
		flex-grow: 1;
		display: block;
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

	@media (--lg) {
		span {
			flex-grow: unset;
			width: 100%;
		}
	}
</style>
