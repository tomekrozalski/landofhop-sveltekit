<script>
	import { afterUpdate } from 'svelte';
	import navigation from '$lib/utils/stores/navigation';
	import SearchResults from '$lib/components/beverageList/searchResults.svelte';

	afterUpdate(() => {
		const params = new URLSearchParams(window.location.search);
		let value = params.get('search') ?? '';
		navigation.setSearchPhrase(value);
	});
</script>

<main>
	{#if $navigation.isSearchbarActive}
		<SearchResults />
	{:else}
		<slot />
	{/if}
</main>
