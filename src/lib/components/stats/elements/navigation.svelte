<script lang="ts">
	import { page } from '$app/stores';

	export let navItems: {
		link: string;
		name: string;
	}[];
</script>

<nav>
	<ul style:grid-template-columns="repeat({navItems.length}, 1fr)">
		{#each navItems as { link, name }}
			<li><a class:active={$page.url.pathname === link} href={link}>{name}</a></li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	a {
		display: flex;
		justify-content: center;
		padding: 1rem;
		background-color: var(--color-grey-5);
		color: var(--color-black);
	}

	a.active {
		background-color: var(--color-success);
		color: var(--color-white);
	}

	@media (--md) {
		ul {
			flex-direction: row;
		}

		li {
			flex: 0 1 50%;
		}
	}
</style>
