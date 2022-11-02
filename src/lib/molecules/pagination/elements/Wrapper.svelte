<ul><slot /></ul>

<style>
	ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		max-width: var(--size-container-max-width);
		margin: 6rem 0;
	}

	@media (min-width: 560px) {
		ul {
			margin: 6rem auto;
		}
	}

	@media (min-width: 1200px) {
		ul {
			margin: 12rem auto 8rem auto;
		}
	}
</style>
