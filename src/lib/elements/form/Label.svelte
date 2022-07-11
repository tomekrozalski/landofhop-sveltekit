<script lang="ts">
	export let id: string;
	export let isRequired: boolean = false;
</script>

<label for={id}>
	<slot />
	{#if isRequired}
		<span>*</span>
	{/if}
</label>

<style>
	label {
		grid-column: 1 / 2;
		line-height: var(--size-input-height);
		height: var(--size-input-height);
		text-align: right;
		cursor: pointer;
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
</style>
