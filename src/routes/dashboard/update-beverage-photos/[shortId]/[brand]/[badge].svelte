<script context="module" lang="ts">
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

	export async function load({ fetch, params }) {
		try {
			const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.beveragePhotos, {
				pathParams: [params.shortId]
			});
			return { props: { forbidden: false, photosData } };
		} catch (err) {
			return { props: { forbidden: err.message === 'Unauthorized', photosData: {} } };
		}
	}
</script>

<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import { session } from '$app/stores';
	import dictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import UpdateBeveragePhotos from '$lib/dashboard/beveragePhotos/beveragePhotos.svelte';

	translations.update(dictionary as Translations);

	export let forbidden: boolean;
	export let photosData: PhotosDataTypes | null;

	if (forbidden) {
		$session.isLoggedIn = false;
	}

	beveragePhotosStore.set(photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeveragePhotos')}</title>
</svelte:head>

<UpdateBeveragePhotos />
