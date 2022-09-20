<script lang="ts">
	import { translate, translations } from 'svelte-intl';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Pagination from '$lib/elements/Pagination/Pagination.svelte';

	import Breadcrumbs from '../../beverageList/Breadcrumbs.svelte';
	import BeverageList from '../../beverageList/BeverageList.svelte';
	import dictionary from '../../beverageList/dictionary.json';
	import type { PageData } from '../../$types';

	export let data: PageData;

	translations.update(dictionary);
</script>

<svelte:head>
	<title>Land of Hop, 📄 {data.order}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('homePage.breadcrumbs', { order: data.order }) }]} />
<BeverageList beverages={data.beverages} />
<Pagination order={data.order} total={data.total} />
