<script lang="ts">
	import { translate } from 'svelte-intl';
	import authentication from '$lib/utils/stores/authentication';
	import Button from '$lib/elements/form/Button.svelte';
	import WarningIcon from '$lib/elements/vectors/Warning.svelte';
	import Status from '$lib/utils/enums/Status.enum';

	const handleClick = () => {
		authentication.setLoginStatus(Status.idle);
	};
</script>

<div>
	<WarningIcon />
	{$translate('login.failed')}
	<Button {handleClick}>{$translate('login.tryAgain')}</Button>
</div>

<style>
	div {
		justify-content: center;
		align-items: center;
	}

	div :global(svg) {
		visibility: hidden;
	}

	div :global(button) {
		margin-left: 1rem;
	}

	@media (--md) {
		div :global(svg) {
			width: auto;
			height: var(--size-loginbar-height);
			fill: var(--color-warning);
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
