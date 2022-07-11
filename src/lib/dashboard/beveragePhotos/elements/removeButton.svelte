<script lang="ts">
	import CloseIcon from '$lib/elements/vectors/Close.svelte';

	export let removeImage: () => {};
</script>

<button type="button" on:click={removeImage}><CloseIcon /></button>

<style>
	button {
		display: flex;
		width: 2rem;
		height: 2rem;
		background-color: var(--color-grey-4);
		transition: background-color var(--transition-default);
		position: absolute;
		top: 0;
		right: 0;
	}

	button:hover {
		background-color: var(--color-black);
	}

	button :global(.icon-close) {
		fill: var(--color-grey-2);
		transition: fill var(--transition-default);
	}

	button:hover :global(.icon-close) {
		fill: var(--color-white);
	}
</style>
