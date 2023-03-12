<script lang="ts">
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/atoms/Breadcrumbs.svelte';
	import BeverageDetails from './BeverageDetails.svelte';

	export let data;
</script>

<svelte:head>
	<title>🍻 {data.details.brand.name.value}, {data.details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

{#if data.details}
	<Breadcrumbs
		steps={[
			{
				label: $translate('beverage.breadcrumbs.list', { listPage: data.listPage }),
				link: data.listPage === 1 ? '/' : `/list/${data.listPage}`
			},
			{
				label: $translate('beverage.breadcrumbs.details')
			}
		]}
	/>
	<BeverageDetails />
{/if}
