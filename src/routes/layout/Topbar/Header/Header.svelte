<script lang="ts">
	import layoutStore from '../../store';
	import Logo from './Logo.svelte';
	import SearchBar from './Searchbar/Searchbar.svelte';
	import NavigationSwitcher from './NavigationSwitcher.svelte';
</script>

<header
	class:isNavigationOpened={$layoutStore.isNavigationOpened}
	class:isLoginOpened={$layoutStore.isLoginOpened}
>
	<div>
		<Logo />
		<SearchBar />
		<NavigationSwitcher />
	</div>
</header>

<style>
	header {
		width: 100%;
		height: var(--size-header-height);
		background-color: var(--color-black);
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--index-header);
		transform: translateY(0);
		transition: transform var(--transition-default);
	}

	.isNavigationOpened {
		transform: translateY(var(--size-navbar-height));
	}

	.isLoginOpened {
		transform: translateY(calc(var(--size-navbar-height) + var(--size-loginbar-height)));
	}

	div {
		display: grid;
		grid-template-columns:
			minmax(var(--size-header-button-width), auto)
			1fr
			minmax(var(--size-header-button-width), auto);
		grid-template-areas: 'search logo more';
		grid-template-rows: var(--size-header-height);
		width: 100%;
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		position: relative;
	}
</style>
