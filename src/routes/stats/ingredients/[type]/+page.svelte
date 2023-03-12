<script lang="ts">
	import { translate } from 'svelte-intl';
	import { ingredientsStore } from '$lib/utils/stores/selects';
	import StatsWrapper from '../../elements/Wrapper.svelte';
	import Ingredients from './Ingredients.svelte';

	export let data;

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
