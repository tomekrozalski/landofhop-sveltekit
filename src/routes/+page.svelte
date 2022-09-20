<script lang="ts">
	import { translate, translations } from 'svelte-intl';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Pagination from '$lib/elements/Pagination/Pagination.svelte';

	import Breadcrumbs from './beverageList/Breadcrumbs.svelte';
	import BeverageList from './beverageList/BeverageList.svelte';
	import dictionary from './beverageList/dictionary.json';
	import type { PageData } from './$types';

	export let data: PageData;

	translations.update(dictionary);
</script>

<svelte:head>
	<title>Land of Hop</title>
	<meta name="description" content={$translate('homePage.description')} />
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('homePage.breadcrumbs', { order: 1 }) }]} />
<BeverageList beverages={data.beverages} />
<Pagination order={1} total={data.total} />
