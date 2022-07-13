<script lang="ts">
	import { translate } from 'svelte-intl';

	export let to: string;
</script>

<a href={to} target="_blank">{$translate('dashboard.ratings.search')}</a>

<style>
	a {
		grid-column: span 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: var(--size-input-height);
		background-color: var(--color-grey-4);
		font-size: 1.5rem;
		color: var(--color-grey-2);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	a:hover {
		background-color: var(--color-black);
		color: var(--color-grey-3);
	}
</style>
