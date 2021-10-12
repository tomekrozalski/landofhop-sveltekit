<script lang="ts">
	import { translate } from 'svelte-intl';
	import Cover from './cover.svelte';

	export let params: { shortId: string; brand: string; badge: string };
</script>

<article>
	<h1>{$translate('dashboard.beveragePhotos.title')}</h1>
	<Cover {params} />
</article>

<style>
	article :global(.saved-item-wrapper) {
		display: flex;
		border-width: 0.2rem;
		border-color: var(--color-grey-3);
		line-height: 0;
	}

	article :global(.saved-item-wrapper) {
		align-items: flex-end;
		border-style: solid;
		padding: 2rem;
		cursor: no-drop;
	}

	article :global(.saved-item-wrapper *) {
		width: 100%;
	}
</style>
