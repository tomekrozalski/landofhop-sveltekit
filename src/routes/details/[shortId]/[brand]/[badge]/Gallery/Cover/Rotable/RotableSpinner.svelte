<div />

<style>
	div {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: var(--color-black);
		animation: pulse 1s infinite;
		position: absolute;
		top: 0.9rem;
		right: 1.45rem;
		z-index: 1;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(2);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
