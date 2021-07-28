<script lang="ts">
	export let closeNavigation: () => void;
</script>

<a on:click={closeNavigation} href="/">
	<h1>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.3 127.3">
			<title>Land of Hop</title>
			<path
				class="letter-h"
				fill="#222"
				d="M49.9 96.5h-9V67.7H8.9v28.8H0V30.3h8.9v29.2h32V30.3h9V96.5z"
			/>
			<path
				class="letter-o"
				d="M137.4 0c35.5 0 63 28.4 63 63.7 0 35.1-27.5 63.5-63 63.5 -35.3 0-62.6-28.4-62.6-63.5C74.8 28.4 102.1 0 137.4 0zM137.4 111.1c26.1 0 46.1-21.1 46.1-47.3 0-26.3-20-47.5-46.1-47.5 -25.9 0-45.9 21.2-45.9 47.5C91.5 90 111.5 111.1 137.4 111.1z"
			/>
			<path
				class="letter-p"
				fill="#222"
				d="M251.6 30.3c14 0 19.7 10.4 19.7 20.7 0 10.5-5.7 20.6-19.7 20.6h-17.4v24.8h-9V30.3H251.6zM234.3 38.7v24.7h16.8c8.1 0 11.3-6.1 11.3-12.3 0-6-3.2-12.4-10.8-12.4H234.3z"
			/>
		</svg>
	</h1>
</a>

<style>
	a {
		grid-area: logo;
		display: flex;
		justify-content: center;
	}

	h1 {
		display: flex;
		align-items: center;
		margin: 0;
	}

	svg {
		width: 5.9rem;
		height: 2.8rem;
	}

	.letter-h,
	.letter-p {
		fill: var(--color-black);
		transition: fill var(--transition-default);
	}

	a:hover .letter-h,
	a:hover .letter-p {
		fill: var(--color-white);
	}

	@keyframes smoothColor {
		0% {
			fill: var(--color-brand-5);
		}
		50% {
			fill: var(--color-brand-6);
		}
		100% {
			fill: var(--color-brand-5);
		}
	}

	.letter-o {
		fill: var(--color-brand-5);
		animation: smoothColor 15s infinite;
	}

	@media (--md) {
		svg {
			width: 8.5rem;
			height: 4rem;
		}
	}

	@media (--xl) {
		svg {
			width: 12.7rem;
			height: 7rem;
		}
	}
</style>
