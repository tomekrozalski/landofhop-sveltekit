<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { styleStore } from '$lib/utils/stores/selects';
	import StatsWrapper from '../elements/Wrapper.svelte';
	import statsDictionary from '../commonStatsDictionary.json';
	import Styles from './Styles.svelte';
	import styleGroupsDictionary from './styleGroupDictionary.json';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';

	translations.update(statsDictionary);
	translations.update(dictionary);
	translations.update(styleGroupsDictionary);

	export let data: PageData;

	styleStore.set(data.styles);
</script>

<svelte:head>
	<title>{$translate('stats.styles.title')}</title>
</svelte:head>

<StatsWrapper>
	<Styles data={data.statsData} />
</StatsWrapper>
