<script lang="ts">
	import { translate } from 'svelte-intl';

	export let badge: string;
	export let onUpdateClick: (badge: string) => void;
</script>

<button on:click={() => onUpdateClick(badge)} type="button">
	{$translate('stats.common.update')}
</button>

<style>
	button {
		font-size: 1.5rem;
		color: var(--color-success);
		transition: color var(--transition-default);
	}

	button:hover {
		color: var(--color-black);
	}

	button {
		margin: 0 1rem;
		padding: 0;
	}
</style>
