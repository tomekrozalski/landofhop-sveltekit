<svelte:head>
	<style>
		body {
			overflow: hidden;
		}
	</style>
</svelte:head>

<div>
	<ul>
		<li />
		<li />
		<li />
		<li />
	</ul>
</div>

<style>
	div {
		display: block;
		width: 100%;
		height: 100vh;
		background-color: var(--color-white);
		position: absolute;
		top: 0;
		left: 0;
		z-index: var(--index-spinner);
	}

	ul {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) rotateZ(45deg);
	}

	@keyframes animation {
		0%,
		10% {
			-webkit-transform: perspective(140px) rotateX(-180deg);
			transform: perspective(140px) rotateX(-180deg);
			opacity: 0;
		}
		25%,
		75% {
			-webkit-transform: perspective(140px) rotateX(0deg);
			transform: perspective(140px) rotateX(0deg);
			opacity: 1;
		}
		90%,
		100% {
			-webkit-transform: perspective(140px) rotateY(180deg);
			transform: perspective(140px) rotateY(180deg);
			opacity: 0;
		}
	}

	li {
		float: left;
		width: 50%;
		height: 50%;
		position: relative;
		transform: scale(1.1);
	}

	li::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-black);
		animation: animation 2.4s infinite linear both;
		transform-origin: 100% 100%;
	}

	li:nth-child(2) {
		transform: scale(1.1) rotateZ(90deg);
	}

	li:nth-child(2)::before {
		animation-delay: 0.3s;
	}

	li:nth-child(3) {
		transform: scale(1.1) rotateZ(270deg);
	}

	li:nth-child(3)::before {
		animation-delay: 0.9s;
	}

	li:nth-child(4) {
		transform: scale(1.1) rotateZ(180deg);
	}

	li:nth-child(4)::before {
		animation-delay: 0.6s;
	}
</style>
