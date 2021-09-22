<script>
	import { afterUpdate, onMount } from 'svelte';

	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import Status from '$lib/utils/enums/Status.enum';
	import navigation from '$lib/utils/stores/navigation';
	import SearchResults from '$lib/components/beverageList/searchResults.svelte';

	let path = '';

	onMount(() => {
		serverCall(fetch, Endpoints.verifyToken)
			.then(() => navigation.setLoginStatus(Status.fulfilled))
			.catch(() => navigation.setLoginStatus(Status.idle));
	});

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
