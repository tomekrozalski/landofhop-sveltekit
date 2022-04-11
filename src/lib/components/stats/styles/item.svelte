<script lang="ts">
	import { session } from '$app/stores';
	import { translate } from 'svelte-intl';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

	export let item: StylesStatsTypes;
	export let onUpdateClick: (badge: string) => void;
</script>

<li>
	<span lang={item.name.language}>{item.name.value}</span>
	<span class="amount">{item.amount}</span>
	<a href="/stats/styles?search=style%3a{item.badge}" title={$translate('stats.styles.findAll')}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.9 83.8">
			<path
				d="M95.7 10.8a85.2 85.2 0 0 1 26.5 29.9l.7 1.2-.7 1.2A85.3 85.3 0 0 1 95.7 73a61 61 0 0 1-34.3 10.8A61 61 0 0 1 27.2 73 85.2 85.2 0 0 1 .7 43L0 41.9l.7-1.2A85.2 85.2 0 0 1 27 10.8 61 61 0 0 1 61.4 0a61 61 0 0 1 34.3 10.8Zm-35 11.4 4.2.4a13.8 13.8 0 0 0-2.3 7.6 13.3 13.3 0 0 0 13 13.6 12.7 12.7 0 0 0 6.5-1.7v1.4a21.3 21.3 0 1 1-21.3-21.3ZM109 41.9a68.4 68.4 0 0 0-20.8-23.1 47.7 47.7 0 0 0-26.8-8.5 47.6 47.6 0 0 0-26.7 8.5 68.5 68.5 0 0 0-20.8 23A68.3 68.3 0 0 0 34.7 65a47.6 47.6 0 0 0 26.7 8.5A47.7 47.7 0 0 0 88.2 65 68.3 68.3 0 0 0 109 41.9Z"
			/>
		</svg>
	</a>
	{#if $session.isLoggedIn}
		<button on:click={() => onUpdateClick(item.badge)} type="button">
			{$translate('stats.styles.update')}
		</button>
	{/if}
</li>

<style>
	.amount {
		font-size: 1.6rem;
		color: var(--color-grey-1);
	}

	.amount::before {
		content: '(';
		margin-right: 0.1rem;
	}

	.amount::after {
		content: ')';
		margin-left: 0.1rem;
	}

	a,
	button {
		color: var(--color-success);
		transition: color var(--transition-default);
	}

	svg {
		width: 1.5rem;
		height: 1rem;
		fill: var(--color-brand-6);
		transition: fill var(--transition-default);
	}

	a:hover svg {
		fill: var(--color-black);
	}

	button {
		margin: 0 1rem;
		padding: 0;
	}

	button:hover {
		color: var(--color-black);
	}
</style>
