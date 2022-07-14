<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/InlineSpinner.svelte';
	import WarningIcon from '$lib/elements/vectors/Warning.svelte';
	import Dropzone from './elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from './elements/ContentWrapper.svelte';
	import SavedItem from './elements/SavedItem.svelte';
	import NoImage from './elements/NoImage.svelte';
	import Image from './elements/Image.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveCover(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.addBeverageCover, {
			method: 'POST',
			body: formData,
			formData: true
		});

		beveragePhotosStore.set(photosData);
		version = Date.now();
	}
</script>

<section>
	<h2>{$translate('dashboard.beveragePhotos.cover')}</h2>
	<ContentWrapper isEmpty={!$beveragePhotosStore.cover?.height}>
		<SavedItem>
			{#if $beveragePhotosStore.outlines?.cover}
				{@html $beveragePhotosStore.outlines.cover}
			{:else}
				<WarningIcon />
			{/if}
		</SavedItem>
		<SavedItem>
			{#if version}
				{#if $beveragePhotosStore.cover}
					<Image {badge} {brand} {shortId} type="cover" {version} />
				{:else}
					<NoImage />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		<Dropzone save={saveCover} />
	</ContentWrapper>
</section>
