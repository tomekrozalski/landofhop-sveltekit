<script lang="ts">
	import { toggleVisibility } from '$lib/utils/helpers/transitions';
	import Menus from './menus.svelte';

	export let isNavigationOpened: boolean;
	export let isLoginOpened: boolean;
	export let closeNavigation: () => void;

	function toggleLogin() {
		isLoginOpened = !isLoginOpened;
	}
</script>

{#if isNavigationOpened}
	<nav transition:toggleVisibility>
		<div>
			<Menus {closeNavigation} {toggleLogin} />
		</div>
	</nav>
{/if}

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
	}

	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--size-container-max-width);
		height: 100%;
		margin: 0 auto;
	}
	@media (--md) {
		div {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: stretch;
		}
	}
</style>
