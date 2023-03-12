<script lang="ts">
	import { translate } from 'svelte-intl';
	import { styleStore } from '$lib/utils/stores/selects';
	import StatsWrapper from '../elements/Wrapper.svelte';
	import Styles from './Styles.svelte';

	export let data;

	styleStore.set(data.styleList);
</script>

<svelte:head>
	<title>{$translate('stats.styles.title')}</title>
</svelte:head>

<StatsWrapper>
	<Styles data={data.statsData} />
</StatsWrapper>
