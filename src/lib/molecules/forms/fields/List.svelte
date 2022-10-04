<ul>
	<slot />
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1rem;
		width: 100%;
		height: var(--size-input-height);
	}

	ul :global(li) {
		display: flex;
		border: 1px solid var(--color-grey-2);
	}

	ul :global(input) {
		display: none;
	}

	ul :global(label) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: var(--color-grey-4);
		cursor: pointer;
	}

	ul :global(input:checked + label) {
		background-color: var(--color-success);
		color: var(--color-white);
	}
</style>
