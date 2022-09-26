<script context="module" lang="ts">
	throw new Error(
		'@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)'
	);

	// import apiCall, { Endpoints } from '$lib/utils/api/call';
	// import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';

	// export async function load({ fetch, params }) {
	// 	try {
	// 		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.beveragePhotos, {
	// 			pathParams: [params.shortId]
	// 		});
	// 		return { props: { forbidden: false, photosData } };
	// 	} catch (err) {
	// 		return { props: { forbidden: err.message === 'Unauthorized', photosData: {} } };
	// 	}
	// }
</script>

<script lang="ts">
	throw new Error(
		'@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)'
	);

	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	// import { session } from '$app/stores';
	import dictionary from '$lib/utils/dictionary/screens/dashboard.json';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import UpdateBeveragePhotos from 'src/routes/dashboard/update-beverage/[shortId]/[brand]/[badge]/BeveragePhotos.svelte';

	translations.update(dictionary as Translations);

	export let forbidden: boolean;
	export let photosData: PhotosDataTypes | null;

	if (forbidden) {
		// $session.isLoggedIn = false;
		// 	import navigation from '$lib/utils/stores/navigation';
	}

	beveragePhotosStore.set(photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeveragePhotos')}</title>
</svelte:head>

<UpdateBeveragePhotos />
