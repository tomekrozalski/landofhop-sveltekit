<script lang="ts">
	import { translate } from 'svelte-intl';
	import StatsWrapper from './elements/Wrapper.svelte';
	import GeneralStats from './General/General.svelte';
</script>

<svelte:head>
	<title>{$translate('stats.general.title')}</title>
</svelte:head>

<StatsWrapper>
	<GeneralStats />
</StatsWrapper>
