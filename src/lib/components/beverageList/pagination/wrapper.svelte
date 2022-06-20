<ul><slot /></ul>

<style>
	ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		max-width: var(--size-container-max-width);
		margin: 6rem 0;
	}

	@media (--sm) {
		ul {
			margin: 6rem auto;
		}
	}

	@media (--xl) {
		ul {
			margin: 12rem auto 8rem auto;
		}
	}
</style>
