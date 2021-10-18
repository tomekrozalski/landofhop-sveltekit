<script lang="ts">
	export let isGrey: boolean = false;
</script>

<svg class:isGrey viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<circle cx="50" cy="50" r="45" />
</svg>

<style>
	@keyframes svgAnimation {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}

	svg {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		animation: svgAnimation 2s linear infinite;
		margin-left: 1rem;
	}

	@keyframes circleAnimation {
		0%,
		25% {
			stroke-dashoffset: 280;
			transform: rotate(0);
		}

		50%,
		75% {
			stroke-dashoffset: 75;
			transform: rotate(45deg);
		}

		100% {
			stroke-dashoffset: 280;
			transform: rotate(360deg);
		}
	}

	svg circle {
		animation: circleAnimation 1.4s ease-in-out infinite both;
		display: block;
		fill: transparent;
		stroke: var(--color-white);
		stroke-linecap: round;
		stroke-dasharray: 283;
		stroke-dashoffset: 280;
		stroke-width: 1rem;
		transform-origin: 50% 50%;
	}

	svg.isGrey circle {
		stroke: var(--color-grey-2);
	}
</style>
