<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import commonFormsDictionary from '$lib/utils/dictionary/form.json';

	import dictionary from './dictionary.json';
	import AdvancedSearch from './AdvancedSearch.svelte';

	translations.update(dictionary);
	translations.update(commonFormsDictionary);
</script>

<svelte:head>
	<title>{$translate('advancedSearch.title')}</title>
</svelte:head>

<AdvancedSearch />
