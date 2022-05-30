<script lang="ts">
	import { translate } from 'svelte-intl';

	export let count: number;
</script>

<p>{$translate('advancedSearch.foundCount')} <strong>{count}</strong></p>

<style>
	p {
		max-width: var(--size-container-max-width);
		padding: 2rem 1rem;
		margin: 0 auto;
		text-align: right;
	}

	strong {
		display: inline-block;
		margin-left: 0.4rem;
		padding: 0 0.8rem;
		border-radius: 0.5rem;
		background-color: var(--color-black);
		color: var(--color-white);
		font-weight: var(--font-weight-regular);
		line-height: 1.6;
	}
</style>
