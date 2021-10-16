<script lang="ts">
	import { translate } from 'svelte-intl';
	import Cover from './cover.svelte';
</script>

<article>
	<h1>{$translate('dashboard.beveragePhotos.title')}</h1>
	<Cover />
</article>

<style>
	article :global(.saved-item-wrapper) {
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		border: 0.2rem solid var(--color-grey-3);
		padding: 2rem;
		line-height: 0;
		cursor: no-drop;
	}

	article :global(.saved-item-wrapper *) {
		width: 100%;
	}
</style>
