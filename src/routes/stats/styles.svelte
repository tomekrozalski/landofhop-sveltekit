<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { Style as StyleType } from '$lib/utils/types/Style';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

	export async function load({ fetch, session }) {
		try {
			if (session.isLoggedIn) {
				const [statsData, styles]: [StylesStatsTypes[], StyleType[]] = await Promise.all([
					apiCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] }),
					apiCall(fetch, Endpoints.styles)
				]);

				return { props: { statsData, styles } };
			}

			const statsData = await apiCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] });

			return { props: { statsData, styles: [] } };
		} catch {
			return {
				props: { statsData: [], styles: [] }
			};
		}
	}
</script>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { styleStore } from '$lib/utils/stores/selects';
	import statsDictionary from '$lib/utils/dictionary/screens/stats/common.json';
	import stylesStatsDictionary from '$lib/utils/dictionary/screens/stats/styles.json';
	import styleGroupsDictionary from '$lib/utils/dictionary/lists/styleGroup.json';
	import StatsWrapper from '$lib/components/stats/elements/Wrapper.svelte';
	import Styles from '$lib/components/stats/Styles/Styles.svelte';

	translations.update(statsDictionary);
	translations.update(stylesStatsDictionary);
	translations.update(styleGroupsDictionary);

	export let statsData: StylesStatsTypes[];
	export let styles: StyleType[];

	styleStore.set(styles);
</script>

<svelte:head>
	<title>{$translate('stats.styles.title')}</title>
</svelte:head>

<StatsWrapper>
	<Styles data={statsData} />
</StatsWrapper>
