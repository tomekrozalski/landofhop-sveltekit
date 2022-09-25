<script lang="ts">
	import { translations, translate } from 'svelte-intl';

	import { ingredientsStore } from '$lib/utils/stores/selects';

	import StatsWrapper from '../../elements/Wrapper.svelte';
	import commonStatsDictionary from '../../commonStatsDictionary.json';
	import dictionary from './dictionary.json';
	import Ingredients from './Ingredients.svelte';
	import type { PageData } from './$types';

	translations.update(commonStatsDictionary);
	translations.update(dictionary);

	export let data: PageData;

	if (data.ingredients) {
		ingredientsStore.set(data.ingredients);
	}
</script>

<svelte:head>
	<title>{$translate('stats.ingredients.title')}</title>
</svelte:head>

<StatsWrapper>
	{#if data.statsData}
		<Ingredients data={data.statsData} />
	{/if}
</StatsWrapper>
