<script lang="ts">
	import { translate } from 'svelte-intl';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import RatesInfo from './RatesInfo.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('brands.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('brands.title')}</h1>
	<RatesInfo />
	<section>
		<h2>ilość piw uwarzonych</h2>
		<ul>
			<li>nazwa</li>
			<li>samodzielnie</li>
			<li>w kooperacji</li>
			<li>jako kontraktor</li>
			<li>średnia ocena</li>
			<li>punty</li>
		</ul>
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
</article>

<style>
	h2 {
		margin: 0;
		text-align: center;
	}

	ul {
		background-color: var(--color-brand-6-light);
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
	}

	a {
		border-bottom: 0.1rem solid var(--color-grey-3);
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
	}

	a:hover {
		background-color: var(--color-brand-6);
		color: var(--color-white);
	}

	li,
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
