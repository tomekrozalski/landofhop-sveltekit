<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
</script>

<footer transition:slide>
	<ul>
		{#if details.rateBeer}
			<li>
				RateBeer:<br /><strong>{details.rateBeer.value}</strong> ({details.rateBeer.quantity} głosów)
			</li>
		{/if}
		{#if details.untappd}
			<li>
				Untappd:<br /><strong>{details.untappd.value}</strong> ({details.untappd.quantity} głosów)
			</li>
		{/if}
	</ul>
	<div>ostatnia aktualizacja 22.06.2022</div>
</footer>

<style>
	footer {
		background-color: var(--color-grey-5);
	}

	ul {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		line-height: 1.7;
	}

	li + li {
		margin-top: 0.8rem;
	}

	div {
		padding: 1rem;
		font: var(--font-weight-light) 1.4rem / 1.8rem var(--font-primary);
		color: #999;
		text-align: right;
	}
</style>
