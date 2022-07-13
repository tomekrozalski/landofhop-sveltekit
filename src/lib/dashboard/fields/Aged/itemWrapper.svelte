<script lang="ts">
	import { translate } from 'svelte-intl';

	export let i: number;
</script>

<div>
	<h4>{$translate('dashboard.aged.method', { value: i + 1 })}</h4>
	<slot />
</div>

<style>
	div {
		grid-column: 2/3;
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: 1rem;
		border: 0.2rem solid var(--color-grey-2);
		padding: 1rem;
	}

	h4 {
		margin: 0;
		font-weight: var(--font-weight-regular);
	}
</style>
