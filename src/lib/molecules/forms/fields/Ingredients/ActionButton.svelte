<script lang="ts">
	export let onClick: () => void;
	export let isAdd: boolean = false;
	export let isRemove: boolean = false;
</script>

<button class:isAdd class:isRemove on:click={onClick} type="button">
	{#if isAdd}
		+
	{/if}
	{#if isRemove}
		-
	{/if}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: baseline;
		width: var(--size-input-height);
		height: var(--size-input-height);
		border-radius: 50%;
		margin-left: 1rem;
		color: var(--color-white);
		float: right;
		transition: background-color var(--transition-default);
	}

	button.isRemove {
		background-color: var(--color-brand-10-light);
	}

	button.isRemove:hover {
		background-color: var(--color-brand-10);
	}

	button.isAdd {
		background-color: var(--color-success);
	}

	button.isAdd:hover {
		background-color: var(--color-black);
	}
</style>
