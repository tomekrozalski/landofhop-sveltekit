<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$translate('global.404.title')}</title>
</svelte:head>

<div>
	<h1>{$page.status} {$page.error?.message || 'Not found'}</h1>
</div>

<style>
	div {
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		padding: 4rem 0;
		text-align: center;
	}

	h1 {
		margin: 4rem;
		font: var(--font-weight-medium) 4rem / 1.2 var(--font-primary);
		text-shadow: 1px 1px 1px var(--color-grey-4), 0 0 0 var(--color-grey-1),
			1px 1px 1px var(--color-grey-4);
		color: transparent;
	}
</style>
