<script lang="ts">
	import { translate, translations } from 'svelte-intl';

	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	import BeverageDetails from './BeverageDetails.svelte';
	import dictionary from './dictionary.json';
	import type { PageData } from './$types';

	translations.update(dictionary);

	export let data: PageData;
	const { details, listPage, next, previous } = data;
</script>

<svelte:head>
	<title>🍻 {details.brand.name.value}, {details.name.value}</title>
	<link rel="preconnect" href={PHOTO_SERVER} />
</svelte:head>

{#if details}
	{#key details.shortId}
		<Breadcrumbs
			steps={[
				{
					label: $translate('beverage.breadcrumbs.list', { listPage: listPage }),
					link: `/list/${listPage}`
				},
				{
					label: $translate('beverage.breadcrumbs.details')
				}
			]}
		/>
		<BeverageDetails {details} {next} {previous} />
	{/key}
{/if}
