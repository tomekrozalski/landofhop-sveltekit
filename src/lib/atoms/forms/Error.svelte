<span><slot /></span>

<style>
	span {
		padding: 0.2rem 0.6rem;
		font-size: 1.2rem;
		line-height: 2.4rem;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		transform: translateY(100%);
		background-color: var(--color-brand-5-light);
		z-index: 1;
	}

	@media (min-width: 1024px) {
		span {
			padding: 0.6rem 1rem 1rem 1rem;
			font-size: 1.4rem;
			line-height: 1.8rem;
		}
	}
</style>
