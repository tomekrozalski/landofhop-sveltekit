<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import navigation from '$lib/utils/stores/navigation';
	import type { Style as StyleType } from '$lib/utils/types/Style';
	import type { StylesStats as StylesStatsTypes } from '$lib/utils/types/stats/Styles';

	export async function load({ fetch }) {
		try {
			if (get(navigation).isLoggedIn) {
				const [statsData, styles]: [StylesStatsTypes[], StyleType[]] = await Promise.all([
					serverCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] }),
					serverCall(fetch, Endpoints.styles)
				]);

				return { props: { statsData, styles } };
			}

			const statsData = await serverCall(fetch, Endpoints.statsStyles, { pathParams: ['pl'] });
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
	import { styleStore } from '$lib/dashboard/utils/stores';
	import statsDictionary from '$lib/utils/dictionary/screens/stats/common.json';
	import stylesStatsDictionary from '$lib/utils/dictionary/screens/stats/styles.json';
	import styleGroupsDictionary from '$lib/utils/dictionary/lists/styleGroup.json';
	import StatsWrapper from '$lib/components/stats/elements/wrapper.svelte';
	import StylesStats from '$lib/components/stats/styles/styles.svelte';

	translations.update(statsDictionary);
	translations.update(stylesStatsDictionary);
	translations.update(styleGroupsDictionary);

	export let styles: StyleType[];
	export let statsData: StylesStatsTypes[];

	styleStore.set(styles);
</script>

<svelte:head>
	<title>{$translate('stats.styles.title')}</title>
</svelte:head>

<StatsWrapper>
	<StylesStats {statsData} />
</StatsWrapper>
