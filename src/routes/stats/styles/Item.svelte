<script lang="ts">
	import authentication from '$lib/utils/stores/authentication';
	import type { StylesStats as StylesStatsTypes } from 'src/routes/stats/styles/Styles';
	import FindAll from '../elements/FindAll.svelte';
	import UpdateButton from '../elements/UpdateButton.svelte';

	export let item: StylesStatsTypes;
	export let onUpdateClick: (badge: string) => void;
</script>

<li>
	<span lang={item.name.language}>{item.name.value}</span>
	<span class="amount">{item.amount}</span>
	<FindAll query="styleTags={item.badge}" />
	{#if $authentication.isLoggedIn}
		<UpdateButton badge={item.badge} {onUpdateClick} />
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
</style>
