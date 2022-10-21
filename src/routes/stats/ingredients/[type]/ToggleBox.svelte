<script lang="ts">
	export let badge: string;
</script>

<a href="/stats/ingredients/{badge}" data-sveltekit-noscroll>+</a>

<style>
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.6rem;
		height: 1.6rem;
		border: 0.1rem solid var(--color-grey-2);
		padding-bottom: 0.4rem;
		background: var(--color-white);
		font-size: 1.4rem;
		color: var(--color-grey-2);
		position: absolute;
		top: 0.8rem;
		left: -2.2rem;
		transition: border-color var(--transition-default), color var(--transition-default);
		z-index: 1;
	}

	a:hover {
		border-color: var(--color-black);
		color: var(--color-black);
	}
</style>
