<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/landingPage.json';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BeverageList from '$lib/components/BeverageList/BeverageList.svelte';
	import Pagination from '$lib/components/BeverageList/Pagination/Pagination.svelte';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import type { Basics } from '$lib/utils/types/Beverage/Basics';

	export let data: { beverages: Basics[]; total: number };
	const { beverages, total } = data;

	translations.update(dictionary);
</script>

<svelte:head>
	<title>Land of Hop</title>
	<meta name="description" content={$translate('landingPage.description')} />
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('landingPage.breadcrumbs', { order: 1 }) }]} />
<BeverageList {beverages} />
<Pagination order={1} {total} />
