<script lang="ts">
	import { translate } from 'svelte-intl';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('brands.title')}</h1>
	<table>
		<tr>
			<th />
			<th colspan="3">ilość piw uwarzonych</th>
			<th />
			<th />
		</tr>
		<tr>
			<th>Nazwa</th>
			<th>samodzielnie</th>
			<th>w kooperacji</th>
			<th>jako kontraktor</th>
			<th>średnia ocena</th>
			<th>punty</th>
		</tr>
		{#each data.insitutions as { badge, name, shortId, statsData }}
			{@const { asContractor, asCooperator, avrScore, beverages, points } = statsData}
			<tr>
				<td><MarkLanguage href="/brand/{shortId}/{badge}" tag="a" {name} /></td>
				<td>{beverages || '-'}</td>
				<td>{asCooperator || '-'}</td>
				<td>{asContractor || '-'}</td>
				<td>
					{#if avrScore}
						{new Intl.NumberFormat('pl', { maximumSignificantDigits: 3 }).format(avrScore.value)}
					{/if}
				</td>
				<td>{points.value}</td>
			</tr>
		{/each}
	</table>
</article>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	tr:not(:first-of-type) {
		background-color: var(--color-white);
		transition: background-color var(--transition-default);
		cursor: pointer;
	}

	tr:not(:first-of-type):hover {
		background-color: var(--color-grey-3);
	}

	tr:not(:last-of-type) {
		border-bottom: 0.1rem solid var(--color-grey-3);
	}

	th,
	td {
		text-align: left;
		padding: 0.4rem 0.6rem;
	}

	th[colspan] {
		text-align: center;
	}

	table :global(a) {
		color: var(--color-black);
	}

	table :global(a:hover) {
		text-decoration: underline;
	}
</style>
