<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
</script>

<h1 in:fade={{ duration: 200 }}>{$translate('header.search.nothingFound')}</h1>

<style>
	h1 {
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		padding: 8rem 0;
		font: var(--font-weight-medium) 4rem / 1.2 var(--font-primary);
		text-shadow: 1px 1px 1px var(--color-grey-4), 0 0 0 var(--color-grey-1),
			1px 1px 1px var(--color-grey-4);
		text-align: center;
		color: transparent;
	}
</style>
