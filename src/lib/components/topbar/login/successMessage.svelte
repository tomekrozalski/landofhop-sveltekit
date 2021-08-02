<script lang="ts">
	import { onMount } from 'svelte';
	import navigation from '$lib/utils/stores/navigation';
	import SuccessIcon from '$lib/elements/vectors/success.svelte';

	onMount(() => {
		setTimeout(() => {
			navigation.closeLoginbar();
		}, 3000);
	});
</script>

<div>
	<SuccessIcon />
	Zalogowano poprawnie
</div>

<style>
	div {
		justify-content: center;
		align-items: center;
	}

	div :global(svg) {
		visibility: hidden;
	}

	@media (--md) {
		div :global(svg) {
			width: auto;
			height: var(--size-loginbar-height);
			position: absolute;
			top: -25%;
			left: 2rem;
			opacity: 0.5;
			visibility: visible;
		}
	}

	@media (--lg) {
		div :global(svg) {
			left: 15%;
		}
	}
</style>
