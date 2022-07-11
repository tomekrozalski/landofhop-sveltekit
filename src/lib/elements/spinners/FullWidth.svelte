<div class="lds-ellipsis">
	<div />
	<div />
	<div />
	<div />
</div>

<style>
	.lds-ellipsis {
		display: block;
		width: 8rem;
		height: 8rem;
		margin: 0 auto;
		position: relative;
	}

	.lds-ellipsis div {
		position: absolute;
		top: 3.3rem;
		left: 50%;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
		background: var(--color-black);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}

	.lds-ellipsis div:nth-child(1) {
		left: 0.8rem;
		animation: lds-ellipsis1 0.6s infinite;
	}

	.lds-ellipsis div:nth-child(2) {
		left: 0.8rem;
		animation: lds-ellipsis2 0.6s infinite;
	}

	.lds-ellipsis div:nth-child(3) {
		left: 3.2rem;
		animation: lds-ellipsis2 0.6s infinite;
	}

	.lds-ellipsis div:nth-child(4) {
		left: 5.6rem;
		animation: lds-ellipsis3 0.6s infinite;
	}

	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}

	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(2.4rem, 0);
		}
	}
</style>
