<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

	export async function load({ fetch, params }) {
		try {
			const photosData: PhotosDataTypes = await serverCall(fetch, Endpoints.beveragePhotos, {
				pathParams: [params.shortId]
			});
			return { props: { photosData } };
		} catch {
			return { props: { photosData: {} } };
		}
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import UpdateBeveragePhotos from '$lib/dashboard/beveragePhotos/beveragePhotos.svelte';

	translations.update(dictionary as Translations);

	export let photosData: PhotosDataTypes | null;
	beveragePhotosStore.set(photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeveragePhotos')}</title>
</svelte:head>

<UpdateBeveragePhotos />
