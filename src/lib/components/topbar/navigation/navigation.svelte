<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import navigation from '$lib/utils/stores/navigation';
	import Menus from './menus.svelte';
</script>

{#if $navigation.isNavigationOpened}
	<nav transition:slide={{ duration: 200, easing: cubicInOut }}>
		<div>
			<Menus />
		</div>
	</nav>
{/if}

<style>
	nav {
		display: block;
		width: 100%;
		background-color: var(--color-white);
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--index-navbar);
	}

	div {
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		height: var(--size-navbar-height);
		max-width: var(--size-container-max-width);
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
