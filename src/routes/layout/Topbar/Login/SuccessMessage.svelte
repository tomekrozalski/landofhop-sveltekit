<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';

	import SuccessIcon from '$lib/atoms/vectors/Success.svelte';

	import layoutStore from '../../store';

	onMount(() => {
		setTimeout(() => {
			layoutStore.closeLoginbar();
		}, 3000);
	});
</script>

<div>
	<SuccessIcon />
	{$translate('login.success')}
</div>

<style>
	div {
		justify-content: center;
		align-items: center;
	}

	div :global(svg) {
		visibility: hidden;
	}

	@media (--md) {
		div :global(svg) {
			width: auto;
			height: var(--size-loginbar-height);
			fill: var(--color-success);
			position: absolute;
			top: -25%;
			left: 2rem;
			opacity: 0.5;
			visibility: visible;
		}
	}

	@media (--lg) {
		div :global(svg) {
			left: 15%;
		}
	}
</style>
