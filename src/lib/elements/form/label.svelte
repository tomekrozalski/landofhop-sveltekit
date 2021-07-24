<script lang="ts">
	import type { FieldTypes } from '$lib/utils/types/form';

	export let data: FieldTypes;
	let { isRequired, label, name } = data;
</script>

<label for={name}>
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
