<script lang="ts">
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import Header from './Header.svelte';
	import Points from './Points.svelte';

	$: insitutions = $page.data.insitutions;
</script>

<section>
	<Header />
	{#each insitutions as { badge, name, shortId, statsData }}
		{@const { asContractor, asCooperator, avrScore, beverages, points } = statsData}
		<a href="/brand/{shortId}/{badge}">
			<div><MarkLanguage tag="span" {name} /></div>
			<div class="independently">{beverages || '-'}</div>
			<div>{asCooperator || '-'}</div>
			<div class="contractor">{asContractor || '-'}</div>
			<div>
				{#if avrScore}
					{new Intl.NumberFormat('pl', { maximumSignificantDigits: 3 }).format(avrScore.value)}
				{:else}
					-
				{/if}
			</div>
			<div>
				<Points value={points.value} />
			</div>
		</a>
	{/each}
</section>

<style>
	section {
		max-width: var(--size-container-max-width);
		margin: 0 auto 8rem auto;
	}

	a {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
		border-bottom: 0.1rem solid var(--color-grey-3);
	}

	a:hover {
		background-color: var(--color-brand-6);
		color: var(--color-white);
	}

	div {
		display: flex;
		align-items: center;
		padding: 0.4rem 1rem;
	}

	div:not(:first-of-type) {
		font-size: 1.5rem;
	}

	.independently {
		border-left: 0.1rem solid var(--color-grey-4);
	}

	.contractor {
		border-right: 0.1rem solid var(--color-grey-4);
	}

	section :global(a) {
		color: var(--color-black);
	}
</style>
