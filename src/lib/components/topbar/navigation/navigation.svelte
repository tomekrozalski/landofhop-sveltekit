<script lang="ts">
	import MainNavigation from './main-navigation.svelte';
	import LangNavigation from './lang-navigation.svelte';

	export let isNavigationOpened: boolean;
</script>

<nav
	class:isNavigationOpened
	id="navigation"
	role="region"
	aria-labelledby="navigation-switcher"
	aria-hidden={!isNavigationOpened}
>
	<MainNavigation />
	<LangNavigation />
</nav>

<style>
	nav {
		display: block;
		width: 100%;
		height: var(--size-navbar-height);
		background: var(--color-white);
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--index-navbar);
		transform: translateY(calc(var(--size-navbar-height) * -1));
		transition: transform var(--transition-default);
	}

	nav.isNavigationOpened {
		transform: translateY(0);
	}
</style>
