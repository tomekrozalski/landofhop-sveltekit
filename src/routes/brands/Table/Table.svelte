<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import Header from './Header.svelte';

	$: data = $page.data;
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<section>
	<Header />
	{#each data.insitutions as { badge, name, shortId, statsData }}
		{@const { asContractor, asCooperator, avrScore, beverages, points } = statsData}
		<a href="/brand/{shortId}/{badge}">
			<div><MarkLanguage tag="span" {name} /></div>
			<div>{beverages || '-'}</div>
			<div>{asCooperator || '-'}</div>
			<div>{asContractor || '-'}</div>
			<div>
				{#if avrScore}
					{new Intl.NumberFormat('pl', { maximumSignificantDigits: 3 }).format(avrScore.value)}
				{/if}
			</div>
			<div>{points.value}</div>
		</a>
	{/each}
</section>

<style>
	a {
		border-bottom: 0.1rem solid var(--color-grey-3);
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
	}

	a:hover {
		background-color: var(--color-brand-6);
		color: var(--color-white);
	}

	div {
		padding: 0.4rem 1rem;
	}

	div:not(:first-of-type) {
		font-size: 1.5rem;
	}

	section :global(a) {
		color: var(--color-black);
	}
</style>
