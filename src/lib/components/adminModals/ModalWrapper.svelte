<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import CloseIcon from '$lib/elements/vectors/Close.svelte';

	function portal(node: HTMLDivElement) {
		let target;
		function update() {
			target = document.querySelector('body') as HTMLBodyElement;
			target.appendChild(node);
			node.hidden = false;
		}
		function destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
		update();
		return { update, destroy };
	}

	export let close: () => void;
</script>

<div class="overlay" use:portal hidden transition:fade>
	<div class="modal" transition:fly={{ y: 200 }}>
		<button type="button" on:click={close} aria-label="close"><CloseIcon /></button>
		<slot />
	</div>
</div>

<style>
	.overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: var(--index-overlay);
	}
	.modal {
		min-width: 68rem;
		padding: 0 4rem 4rem 4rem;
		background-color: var(--color-white);
		position: relative;
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 4rem;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(100%, -100%);
		overflow: hidden;
		transition: background-color var(--transition-default);
	}
	button :global(svg) {
		width: 2rem;
		fill: var(--color-black);
		transition: fill var(--transition-default);
	}
	button:hover {
		background-color: var(--color-black);
	}
	button:hover :global(svg) {
		fill: var(--color-white);
	}
</style>
