<script lang="ts">
	import { translations, translate } from 'svelte-intl';

	import StatsWrapper from './elements/Wrapper.svelte';
	import commonStatsDictionary from './commonStatsDictionary.json';
	import dictionary from './General/dictionary.json';
	import GeneralStats from './General/General.svelte';
	import type { PageData } from './$types';

	translations.update(commonStatsDictionary);
	translations.update(dictionary);

	export let data: PageData;
</script>

<svelte:head>
	<title>{$translate('stats.general.title')}</title>
</svelte:head>

<StatsWrapper>
	<GeneralStats statsData={data.statsData} />
</StatsWrapper>
