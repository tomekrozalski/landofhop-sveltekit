<script context="module" lang="ts">
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { PhotosData as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

	export async function load({ fetch, page }) {
		try {
			const { shortId, brand, badge } = page.params;
			const photosData: PhotosDataTypes = await serverCall(fetch, Endpoints.beveragePhotos, {
				pathParams: [shortId, brand, badge]
			});
			return { props: { params: page.params, photosData } };
		} catch {
			return { props: { params: page.params, photosData: {} } };
		}
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from '$lib/utils/dictionary/dashboard.json';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import UpdateBeveragePhotos from '$lib/dashboard/beveragePhotos/beveragePhotos.svelte';

	translations.update(dictionary as Translations);

	export let params: { shortId: string; brand: string; badge: string };
	export let photosData: PhotosDataTypes;
	beveragePhotosStore.set(photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeveragePhotos')}</title>
</svelte:head>

<UpdateBeveragePhotos {params} />
