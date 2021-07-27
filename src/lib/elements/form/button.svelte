<script>
	export let type = 'button';
	export let disabled = false;
</script>

<button {disabled} {type}><span><slot /></span></button>

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

	button:disabled {
		background-color: var(--color-grey-2);
		color: var(--color-grey-4);
		cursor: not-allowed;
	}

	button:hover:not(:disabled):not(.submitting) {
		background-color: var(--color-grey-2);
		color: var(--color-black);
	}

	span {
		white-space: nowrap;
		position: relative;
		bottom: 0.5px;
	}

	span::first-letter {
		text-transform: capitalize;
	}
</style>
