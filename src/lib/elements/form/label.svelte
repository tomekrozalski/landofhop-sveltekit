<script lang="ts">
	export let name: string,
		isRequired: boolean = false;
</script>

<label for={name}>
	<slot />
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
