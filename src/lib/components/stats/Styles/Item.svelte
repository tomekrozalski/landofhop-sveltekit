<script lang="ts">
	import navigation from '$lib/utils/stores/navigation';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';
	import FindAll from '$lib/components/stats/elements/FindAll.svelte';
	import UpdateButton from '$lib/components/stats/elements/UpdateButton.svelte';

	export let item: StylesStatsTypes;
	export let onUpdateClick: (badge: string) => void;
</script>

<li>
	<span lang={item.name.language}>{item.name.value}</span>
	<span class="amount">{item.amount}</span>
	<FindAll query="styleTags={item.badge}" />
	{#if $navigation.isLoggedIn}
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
