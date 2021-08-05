<script lang="ts">
	import { translate } from 'svelte-intl';
	import navigation from '$lib/utils/stores/navigation';
</script>

<button on:click={navigation.toggleNavbar}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 9">
		<title>
			{#if $navigation.isNavigationOpened}
				{$translate('header.closeNavigation')}
			{:else}
				{$translate('header.openNavigation')}
			{/if}
		</title>
		<circle fill="#fff" cx="35.5" cy="4.5" r="4.5" />
		<circle fill="#fff" cx="20" cy="4.5" r="4.5" />
		<circle fill="#fff" cx="4.5" cy="4.5" r="4.5" />
	</svg>
</button>

<style>
	button {
		grid-area: more;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		display: block;
		width: 2rem;
		height: 0.4rem;
	}

	svg circle {
		fill: var(--color-white);
		transition: fill var(--transition-default);
	}

	button:hover svg circle {
		fill: var(--color-grey-1);
	}

	@media (--md) {
		svg {
			width: 3rem;
			height: 0.6rem;
		}
	}

	@media (--xxxl) {
		svg {
			width: 4rem;
			height: 0.8rem;
		}
	}
</style>
