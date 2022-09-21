<script lang="ts">
	import { translate } from 'svelte-intl';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BeverageList from '$lib/components/BeverageList/BeverageList.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Land of Hop, 📄 {data.order}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('beverageList.breadcrumbs', { order: data.order }) }]} />
<BeverageList beverages={data.beverages} />
<Pagination order={data.order} total={data.total} />
