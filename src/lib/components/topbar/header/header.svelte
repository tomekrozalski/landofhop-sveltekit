<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
	import Logo from './logo.svelte';
	import SearchBar from './searchbar.svelte';
	import NavigationSwitcher from './navigation-switcher.svelte';
</script>

<header
	class:isNavigationOpened={$navigation.isNavigationOpened}
	class:isLoginOpened={$navigation.isLoginOpened}
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
		grid-template-columns: minmax(5rem, auto) 1fr minmax(5rem, auto);
		grid-template-areas: 'search logo more';
		grid-template-rows: var(--size-header-height);
		width: 100%;
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		position: relative;
	}

	@media (--md) {
		div {
			grid-template-columns: minmax(10rem, auto) 1fr minmax(10rem, auto);
		}
	}
</style>
