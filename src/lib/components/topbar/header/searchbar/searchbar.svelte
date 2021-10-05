<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
	import Magnifier from './magnifier.svelte';
	import Close from './close.svelte';
	import SearchInput from './searchInput.svelte';
</script>

<div class:isSearchBarOpen={$navigation.isSearchbarActive}>
	{#if $navigation.isSearchbarActive}
		<SearchInput />
	{/if}
	{#if $navigation.isSearchbarActive}
		<button on:click={navigation.closeSearchBar} class="close-btn"><Close /></button>
	{:else}
		<button on:click={navigation.openSearchBar}><Magnifier /></button>
	{/if}
</div>

<style>
	div {
		display: flex;
		width: 100%;
		height: 100%;
		background-color: var(--color-black);
		transition: background-color 0.2s;
		position: absolute;
		top: 0;
		right: calc(100% - var(--size-header-button-width));
		transition: right var(--transition-default);
	}

	div.isSearchBarOpen {
		right: 0;
	}

	button {
		width: var(--size-header-button-width);
		height: var(--size-header-height);
		position: absolute;
		top: 0;
		right: 0;
	}

	button :global(svg) {
		width: 1.8rem;
		height: 1.8rem;
		fill: var(--color-white);
		transition: fill var(--transition-default);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	button.close-btn :global(svg) {
		fill: var(--color-danger);
	}

	button:hover :global(svg) {
		fill: var(--color-grey-1);
	}

	@media (--md) {
		button :global(svg) {
			width: 2.4rem;
			height: 2.4rem;
		}
	}

	@media (--xl) {
		button :global(svg) {
			width: 3rem;
			height: 3rem;
		}
	}
</style>
