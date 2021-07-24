<script lang="ts">
	export let type = 'button';
</script>

<button {type}><span><slot /></span></button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--size-input-height);
		padding: 0 2rem;
		background-color: var(--color-black);
		color: var(--color-white);
		transition: background-color var(--transition-default), color var(--transition-default);
		cursor: pointer;
	}

	button:hover:not(:disabled):not(.submitting) {
		background-color: var(--color-grey-2);
		color: var(--color-black);
	}

	span {
		white-space: nowrap;
	}

	span::first-letter {
		text-transform: capitalize;
	}
</style>
