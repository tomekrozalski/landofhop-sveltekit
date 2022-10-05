<script>
	import { afterUpdate } from 'svelte';
	import layoutStore from './store';
	import SearchResults from './SearchResults/SearchResults.svelte';

	let path = '';

	afterUpdate(() => {
		const params = new URLSearchParams(window.location.search);
		let value = params.get('search') ?? '';
		layoutStore.setSearchPhrase(value);

		if (path !== window.location.pathname) {
			if (!window.location.search) {
				layoutStore.closeSearchBar();
			}

			path = window.location.pathname;
		}
	});
</script>

<main>
	{#if $layoutStore.isSearchbarActive}
		<SearchResults />
	{:else}
		<slot />
	{/if}
</main>
