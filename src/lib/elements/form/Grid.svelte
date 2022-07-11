<script lang="ts">
	export let columns: 1 | 2 | 3 | 4 = 1;
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

		--narrow-cell: 22rem;
		--wide-cell: 45rem;
		--wide-cell-optional: calc(44rem - var(--size-input-height));
	}

	div :global(label) {
		justify-self: end;
	}

	.columns-1:not(.isOptional) {
		grid-template-columns:
			repeat(2, var(--wide-cell))
			repeat(2, var(--size-input-height))
			1fr;
	}

	.columns-1.isOptional {
		grid-template-columns:
			var(--wide-cell-optional)
			var(--size-input-height)
			var(--wide-cell)
			repeat(2, var(--size-input-height))
			1fr;
	}

	.columns-2:not(.isOptional) {
		grid-template-columns:
			var(--wide-cell)
			repeat(2, var(--narrow-cell))
			repeat(2, var(--size-input-height))
			1fr;
	}

	.columns-2.isOptional {
		grid-template-columns:
			var(--wide-cell-optional)
			var(--size-input-height)
			repeat(2, var(--narrow-cell))
			1fr;
	}

	.columns-3:not(.isOptional) {
		grid-template-columns:
			var(--wide-cell)
			repeat(3, 14.33rem)
			repeat(2, var(--size-input-height));
	}

	.columns-3.isOptional {
		grid-template-columns:
			var(--wide-cell-optional)
			var(--size-input-height)
			repeat(3, 14.333rem)
			1fr;
	}
</style>
