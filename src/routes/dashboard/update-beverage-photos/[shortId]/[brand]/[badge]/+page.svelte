<script lang="ts">
	import { translate, translations } from 'svelte-intl';
	import type { Translations } from 'svelte-intl';
	import dictionary from './dictionary.json';
	import { beveragePhotosStore } from './stores';
	import UpdateBeveragePhotos from './BeveragePhotos.svelte';
	import type { PageData } from './$types';

	translations.update(dictionary as Translations);

	export let data: PageData;
	beveragePhotosStore.set(data.photosData);
</script>

<svelte:head>
	<title>Land of Hop 🔒 Dashboard, {$translate('dashboard.title.updateBeveragePhotos')}</title>
</svelte:head>

<UpdateBeveragePhotos />
