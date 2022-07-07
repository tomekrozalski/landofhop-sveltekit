<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
</script>

<a on:click={navigation.close} href="/">
	<h1>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.3 127">
			<title>Land of Hop</title>
			<path
				class="letter-h"
				fill="#222"
				d="M49.9 96.35h-9v-28.8h-32v28.8H0v-66.2h8.9v29.2h32v-29.2h9v66.2z"
			/>
			{#if $navigation.isLoading}
				<path class="letter-o-loading" d="M92.35 31.39a55.5 55.5 0 1 0 18.77-16.68" />
			{:else}
				<circle cx="137.6" cy="63.5" r="55.5" class="letter-o" />
			{/if}
			<path
				class="letter-p"
				fill="#222"
				d="M251.6 30.15c14 0 19.7 10.4 19.7 20.7 0 10.5-5.7 20.6-19.7 20.6h-17.4v24.8h-9v-66.1h26.4zm-17.3 8.4v24.7h16.8c8.1 0 11.3-6.1 11.3-12.3 0-6-3.2-12.4-10.8-12.4h-17.3z"
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

	a:focus {
		outline: none;
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
	a:hover .letter-p,
	a:focus .letter-h,
	a:focus .letter-p {
		fill: var(--color-white);
	}

	@keyframes smoothColor {
		0% {
			stroke: var(--color-brand-5);
		}
		50% {
			stroke: var(--color-brand-6);
		}
		100% {
			stroke: var(--color-brand-5);
		}
	}

	.letter-o,
	.letter-o-loading {
		fill: none;
		stroke: var(--color-brand-5);
		stroke-width: 1.6rem;
		stroke-linecap: round;
		stroke-miterlimit: 10;
	}

	.letter-o {
		animation: smoothColor 15s infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.letter-o-loading {
		animation: spin 1s infinite;
		transform-origin: 137.5px;
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
