<script lang="ts">
	export let isNavigationOpened: boolean;
</script>

<button
	aria-expanded={isNavigationOpened}
	aria-controls="navigation"
	id="navigation-switcher"
	on:click={() => (isNavigationOpened = !isNavigationOpened)}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 9">
		<title>
			{#if isNavigationOpened}
				Close
			{:else}
				Open
			{/if}
		</title>
		<circle cx="35.5" cy="4.5" r="4.5" />
		<circle cx="20" cy="4.5" r="4.5" />
		<circle cx="4.5" cy="4.5" r="4.5" />
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

	@media (--xxxl) {
		svg {
			width: 4rem;
			height: 0.8rem;
		}
	}
</style>
