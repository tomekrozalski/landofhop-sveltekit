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
		grid-template-columns:
			22rem 35rem
			repeat(2, var(--size-input-height))
			1fr;
	}

	.columns-1.isOptional {
		grid-template-columns:
			17.6rem
			var(--size-input-height)
			35rem
			repeat(2, var(--size-input-height))
			1fr;
	}

	.columns-2:not(.isOptional) {
		grid-template-columns:
			22rem
			repeat(2, 17rem)
			repeat(2, var(--size-input-height))
			1fr;
	}
</style>
