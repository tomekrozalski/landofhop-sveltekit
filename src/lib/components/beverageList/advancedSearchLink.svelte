<script lang="ts">
	import { translate } from 'svelte-intl';
	import navigation from '$lib/utils/stores/navigation';

	export let type: 'block' | 'inline' = 'block';
</script>

<div class:block={type === 'block'} class:inline={type === 'inline'}>
	<a href="/advanced-search" on:click={navigation.closeSearchBar}>
		{$translate('header.advancedSearch.link')}
	</a>
</div>

<style>
	div {
		text-align: right;
		position: relative;
		z-index: var(--index-advanced-search);
	}

	div.block {
		max-width: var(--size-container-max-width);
		margin: 0 auto;
	}

	div.inline {
		flex-grow: 1;
	}

	a {
		display: inline-block;
		padding: 2rem;
		background-color: var(--color-white);
		transition: background-color var(--transition-default);
		color: var(--color-black);
	}

	a:hover {
		background-color: var(--color-grey-4);
	}
</style>
