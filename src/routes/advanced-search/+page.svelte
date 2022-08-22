<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import advancedSearchDictionary from '$lib/utils/dictionary/screens/advancedSearch.json';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';
	import AdvancedSearch from '$lib/components/AdvancedSearch/AdvancedSearch.svelte';

	translations.update(advancedSearchDictionary);
	translations.update(commonFormsDictionary);
</script>

<svelte:head>
	<title>{$translate('advancedSearch.title')}</title>
</svelte:head>

<AdvancedSearch />
