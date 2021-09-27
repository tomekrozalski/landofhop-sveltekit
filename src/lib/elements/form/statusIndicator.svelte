<script lang="ts">
	import SuccessIcon from '$lib/elements/vectors/success.svelte';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';

	export let isTouched: boolean, isValid: boolean;
	export let style: string = '';
</script>

<span {style}>
	{#if isTouched && isValid}
		<SuccessIcon style="right: 0.6rem" />
	{:else if isTouched && !isValid}
		<WarningIcon style="right: 0.8rem" />
	{/if}
	<slot />
</span>

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
</style>
