<script>
	import { onMount } from 'svelte';

	export let once = false;
	export let threshold = 0;

	let intersecting = false;
	let container;

	onMount(() => {
		if (typeof IntersectionObserver !== 'undefined') {
			const observer = new IntersectionObserver(
				(entries) => {
					intersecting = entries[0].isIntersecting;
					if (intersecting && once) {
						observer.unobserve(container);
					}
				},
				{ threshold }
			);

			observer.observe(container);
			return () => observer.unobserve(container);
		}
	});
</script>

<div bind:this={container}>
	<slot {intersecting} />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
