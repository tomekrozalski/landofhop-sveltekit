<script lang="ts">
	export let isNavigationOpened: boolean, isLoginOpened: boolean;

	function toggle() {
		isNavigationOpened = !isNavigationOpened;
		isLoginOpened = false;
	}
</script>

<button
	aria-expanded={isNavigationOpened}
	aria-controls="navigation"
	id="navigation-switcher"
	on:click={toggle}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 9">
		<title>
			{#if isNavigationOpened}
				Zamknij
			{:else}
				Otwórz
			{/if}
		</title>
		<circle fill="#fff" cx="35.5" cy="4.5" r="4.5" />
		<circle fill="#fff" cx="20" cy="4.5" r="4.5" />
		<circle fill="#fff" cx="4.5" cy="4.5" r="4.5" />
	</svg>
</button>

<style>
	button {
		grid-area: more;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		display: block;
		width: 2rem;
		height: 0.4rem;
	}

	svg circle {
		fill: var(--color-white);
		transition: fill var(--transition-default);
	}

	button:hover svg circle {
		fill: var(--color-grey-1);
	}

	@media (--md) {
		svg {
			width: 3rem;
			height: 0.6rem;
		}
	}

	@media (--xxxl) {
		svg {
			width: 4rem;
			height: 0.8rem;
		}
	}
</style>
