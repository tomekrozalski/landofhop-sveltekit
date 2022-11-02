<script lang="ts">
	export let id: string;
	export let inlined: boolean = false;
	export let isRequired: boolean = false;
</script>

<label for={id} class:inlined>
	<slot />
	{#if isRequired}
		<span>*</span>
	{/if}
</label>

<style>
	label {
		width: 100%;
		height: var(--size-input-height);
		line-height: var(--size-input-height);
		text-align: left;
		cursor: pointer;
	}

	label.inlined {
		text-align: right;
	}

	label::after {
		content: ':';
	}

	label::first-letter {
		text-transform: uppercase;
	}

	span {
		margin-left: 0.2rem;
		color: var(--color-danger);
	}

	@media (min-width: 1024px) {
		label {
			grid-column: 1 / 2;
			text-align: right;
		}
	}
</style>
