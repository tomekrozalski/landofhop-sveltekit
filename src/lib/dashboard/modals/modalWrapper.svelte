<script>
	import { fade } from 'svelte/transition';

	function portal(node) {
		let target;

		function update() {
			target = document.querySelector('body');
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
</script>

<div use:portal hidden transition:fade>
	<slot />
</div>

<style>
	div {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: var(--index-overlay);
	}
</style>
