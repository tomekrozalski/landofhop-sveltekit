<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
	import navigation from '$lib/utils/stores/navigation';

	export let item: StylesStatsTypes;
	export let onUpdateClick: (badge: string) => void;
</script>

<li>
	<em lang={item.name.language}>{item.name.value}</em>,
	<span>{$translate('stats.styles.itemsInDatabase')}</span>
	{item.amount}<br />
	<a href="/stats/styles?search=style%3a{item.badge}">
		{$translate('stats.styles.findAll')}
	</a>
	{#if $navigation.isLoggedIn}
		<button on:click={() => onUpdateClick(item.badge)} type="button">
			{$translate('stats.styles.update')}
		</button>
	{/if}
</li>

<style>
	em {
		font-style: normal;
	}

	span {
		color: var(--color-grey-1);
	}

	a,
	button {
		color: var(--color-success);
		transition: color var(--transition-default);
	}

	button {
		margin: 0 1rem;
		padding: 0;
	}

	a:hover,
	button:hover {
		color: var(--color-black);
	}
</style>
