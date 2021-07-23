<script lang="ts">
	import { fade } from 'svelte/transition';
	import LockIcon from '$lib/elements/vectors/lockIcon.svelte';

	export let isNavigationOpened: boolean;
	export let isLoginOpened: boolean;
	export let closeNavigation: () => void;

	function toggleVisibility(node, options) {
		return { duration: 200 };
	}
</script>

{#if isNavigationOpened}
	<nav
		transition:toggleVisibility
		id="navigation"
		role="region"
		aria-labelledby="navigation-switcher"
	>
		<div>
			<ul>
				<button on:click={() => (isLoginOpened = !isLoginOpened)}>
					<LockIcon />
					Log in
				</button>
				<li><a on:click={closeNavigation} href="/about">About</a></li>
				<li><a on:click={closeNavigation} href="/stats">Stats</a></li>
			</ul>
			<ul>
				<li><a on:click={closeNavigation} href="/">PL</a></li>
				<li><a on:click={closeNavigation} href="/">EN</a></li>
			</ul>
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

	ul {
		display: flex;
		margin: 0 1rem;
		padding: 0.5rem 0;
	}

	li {
		display: flex;
	}

	a,
	button {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-white);
		color: var(--color-black);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	button {
		padding: 1rem 1rem 1rem 3rem;
		position: relative;
	}

	a:hover,
	button:hover {
		background-color: var(--color-black);
		color: var(--color-white);
	}

	button :global(svg) {
		width: 1.2rem;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}

	button :global(svg path) {
		fill: var(--color-black);
		transition: fill var(--transition-default);
	}

	button:hover :global(svg path) {
		fill: var(--color-white);
	}

	@media (--md) {
		div {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: stretch;
		}
	}
</style>
