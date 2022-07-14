<script lang="ts">
	import { slide } from 'svelte/transition';
	import { translate } from 'svelte-intl';

	let isCollapsed: boolean = false;
</script>

{#if isCollapsed}
	<div transition:slide>
		<slot />
	</div>
{/if}
<button type="button" on:click={() => (isCollapsed = !isCollapsed)}>
	{#if isCollapsed}
		{$translate('beverage.tale.readLess')}
	{:else}
		{$translate('beverage.tale.readMore')}
	{/if}
</button>

<style>
	div {
		transition: height var(--transition-default);
		overflow: hidden;
	}

	div :global(p:first-of-type) {
		margin-top: 0;
	}

	button {
		padding: 0;
		color: var(--color-success);
		border-bottom: 1px solid transparent;
		transition: color var(--transition-default), border-color var(--transition-default);
	}
</style>
