<script lang="ts">
	import { translate } from 'svelte-intl';
</script>

<div>{$translate('global.loading')}</div>

<style>
	div {
		flex-grow: 1;
		display: block;
		height: 100%;
		position: relative;
	}

	@keyframes move {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: var(--size-input-height) var(--size-input-height);
		}
	}

	div::after {
		content: '';
		background-image: linear-gradient(
			-45deg,
			var(--color-grey-5) 25%,
			var(--color-white) 25%,
			var(--color-white) 50%,
			var(--color-grey-5) 50%,
			var(--color-grey-5) 75%,
			var(--color-white) 75%,
			var(--color-white)
		);
		background-size: var(--size-input-height) var(--size-input-height);
		animation: move 2s linear infinite;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	@media (min-width: 1024px) {
		div {
			flex-grow: unset;
			width: 100%;
		}
	}
</style>
