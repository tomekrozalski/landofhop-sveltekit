<script lang="ts">
	import { slide } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';

	export let details: Details;

	const { rateBeer, total, untappd } = details.ratings; // @ToDo types
</script>

<footer transition:slide|local>
	<ul>
		{#if rateBeer}
			<li>
				RateBeer:<br />
				<strong>{rateBeer.value.toLocaleString('pl', { maximumFractionDigits: 2 })}</strong>
				({$translate('beverage.rating.quantity', { value: rateBeer.quantity })})
			</li>
		{/if}
		{#if untappd}
			<li>
				Untappd:<br />
				<strong>{untappd.value.toLocaleString('pl', { maximumFractionDigits: 2 })}</strong>
				({$translate('beverage.rating.quantity', { value: untappd.quantity })})
			</li>
		{/if}
	</ul>
	<div>{$translate('beverage.rating.updatedAt', { value: total.date })}</div>
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
