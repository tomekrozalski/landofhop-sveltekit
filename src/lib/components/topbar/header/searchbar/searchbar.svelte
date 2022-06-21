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
		<button on:click={navigation.closeSearchBar}><Close /></button>
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

	button:focus {
		background-color: var(--color-white);
	}

	button :global(svg) {
		width: 1.8rem;
		height: 1.8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	button :global(svg path) {
		fill: var(--color-white);
		transition: fill var(--transition-default);
	}

	button:hover :global(svg path) {
		fill: var(--color-grey-1);
	}

	button:focus :global(svg path) {
		fill: var(--color-black);
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
