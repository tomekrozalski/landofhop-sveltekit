<script lang="ts">
	import LockIcon from '$lib/elements/vectors/LockIcon.svelte';

	export let closeNavigation: () => void, toggleLogin: () => void;
</script>

<ul>
	<button on:click={toggleLogin}>
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

<style>
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
</style>
