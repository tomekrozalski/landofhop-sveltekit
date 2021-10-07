<script lang="ts">
	export let columns: 1 | 2 = 1;
	export let isOptional: boolean = false;
</script>

<div class={`columns-${columns}`} class:isOptional>
	<slot />
</div>

<style>
	div {
		display: grid;
		grid-gap: 1rem;
		margin-bottom: 1rem;
	}

	div :global(label) {
		justify-self: end;
	}

	.columns-1:not(.isOptional) {
		grid-template-columns: 1fr 35rem var(--size-input-height);
	}

	.columns-1.isOptional {
		grid-template-columns:
			1fr
			var(--size-input-height)
			35rem
			var(--size-input-height);
	}

	.columns-2:not(.isOptional) {
		grid-template-columns:
			1fr
			repeat(2, 17rem)
			var(--size-input-height);
	}
</style>
