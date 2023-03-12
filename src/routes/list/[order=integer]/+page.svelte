<script lang="ts">
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import Pagination from '$lib/molecules/pagination/Pagination.svelte';
	import BeverageList from '$lib/templates/BeverageList/BeverageList.svelte';

	export let data;
</script>

<svelte:head>
	<title>Land of Hop, 📄 {data.order}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

<Breadcrumbs steps={[{ label: $translate('beverageList.breadcrumbs', { order: data.order }) }]} />
<BeverageList beverages={data.beverages} />
<Pagination order={data.order} total={data.total} />
