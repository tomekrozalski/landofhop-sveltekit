<script lang="ts">
	export let isEmpty: boolean = false;
	export let isCap: boolean = false;
</script>

<div class:isEmpty class:isCap>
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	div.isEmpty {
		height: 54rem;
	}

	div.isCap {
		height: 26.4rem;
	}

	div :global(.icon-warning) {
		fill: var(--color-warning);
		transform: scale(2) translateY(-6.5rem);
		opacity: 0.5;
	}
</style>
