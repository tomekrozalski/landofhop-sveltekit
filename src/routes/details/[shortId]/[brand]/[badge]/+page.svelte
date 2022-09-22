<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import { page } from '$app/stores';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	import BeverageDetails from './BeverageDetails.svelte';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';

	translations.update(dictionary);

	export let data: PageData;
</script>

<svelte:head>
	<title>🍻 {data.details.brand.name.value}, {data.details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

{#if data.details}
	{#key data.details.shortId}
		<Breadcrumbs
			steps={[
				{
					label: $translate('beverage.breadcrumbs.list', { listPage: data.listPage }),
					link: `/list/${data.listPage}`
				},
				{
					label: $translate('beverage.breadcrumbs.details')
				}
			]}
		/>
		<BeverageDetails details={data.details} next={data.next} previous={data.previous} />
	{/key}
{/if}
