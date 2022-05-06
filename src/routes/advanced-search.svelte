<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { onMount } from 'svelte';
	import navigation from '$lib/utils/stores/navigation';
	import advancedSearchDictionary from '$lib/utils/dictionary/screens/advancedSearch.json';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';
	import AdvancedSearch from '$lib/components/advancedSearch/advancedSearch.svelte';

	translations.update(advancedSearchDictionary);
	translations.update(commonFormsDictionary);

	onMount(navigation.closeSearchBar);
</script>

<svelte:head>
	<title>{$translate('advancedSearch.title')}</title>
</svelte:head>

<AdvancedSearch />
