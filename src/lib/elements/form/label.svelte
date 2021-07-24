<script lang="ts">
	export let formStore: any, fieldName: string;
	let { id, isRequired, label } = $formStore[fieldName];
</script>

<label for={id}>
	{label}
	{#if isRequired}
		<span>*</span>
	{/if}
</label>

<style>
	label {
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
