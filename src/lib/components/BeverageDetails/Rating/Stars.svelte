<script lang="ts">
	import StarElement from './StarElement.svelte';

	export let score: number;

	$: valuesArray = new Array(5).fill(0).map((_, index) => {
		if (score > index && score < index + 1) {
			return Number((score - index).toFixed(5));
		}

		return score >= index + 1 ? 1 : 0;
	});
</script>

<strong>{score.toLocaleString('pl', { maximumFractionDigits: 2 })}</strong>
<ul>
	{#each valuesArray as value}
		<StarElement {value} />
	{/each}
</ul>

<style>
	strong {
		font-size: 2.1rem;
		font-weight: var(--font-weight-medium);
		line-height: 2.1rem;
		position: absolute;
		top: auto;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity var(--transition-default);
	}

	ul {
		display: flex;
		justify-content: center;
		column-gap: 0.5rem;
		opacity: 1;
		transition: opacity var(--transition-default);
	}
</style>
