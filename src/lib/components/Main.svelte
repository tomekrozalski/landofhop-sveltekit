<script>
	import { afterUpdate } from 'svelte';
	import navigation from '$lib/utils/stores/navigation';
	import SearchResults from '$lib/components/BeverageList/SearchResults.svelte';

	let path = '';

	afterUpdate(() => {
		const params = new URLSearchParams(window.location.search);
		let value = params.get('search') ?? '';
		navigation.setSearchPhrase(value);

		if (path !== window.location.pathname) {
			if (!window.location.search) {
				navigation.closeSearchBar();
			}

			path = window.location.pathname;
		}
	});
</script>

<main>
	{#if $navigation.isSearchbarActive}
		<SearchResults />
	{:else}
		<slot />
	{/if}
</main>
