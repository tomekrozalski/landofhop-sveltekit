<div>
	<slot />
</div>

<style>
	div {
		display: flex;
		align-items: flex-end;
		width: 26.4rem;
		max-height: 54rem;
		overflow: hidden;
		border: 0.2rem solid var(--color-grey-3);
		padding: 2rem;
		line-height: 0;
		cursor: no-drop;
	}

	div :global(img) {
		width: 100%;
	}
</style>
