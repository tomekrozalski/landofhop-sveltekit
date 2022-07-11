<span><slot /></span>

<style>
	span {
		padding: 0.2rem 0.5rem;
		font-size: 1rem;
		line-height: 1.2rem;
		position: absolute;
		inset: 0;
		transform: translateY(100%);
		background-color: var(--color-brand-5-light);
		z-index: 1;
	}

	@media (--lg) {
		span {
			padding: 0.6rem 1rem 1rem 1rem;
			font-size: 1.4rem;
			line-height: 1.8rem;
		}
	}
</style>
