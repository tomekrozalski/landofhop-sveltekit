<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/inlineSpinner.svelte';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';
	import Dropzone from './elements/dropzone/dropzone.svelte';
	import ContentWrapper from './elements/contentWrapper.svelte';
	import SavedItem from './elements/savedItem.svelte';
	import NoImage from './elements/noImage.svelte';
	import GalleryThumbs from './elements/galleryThumbs.svelte';
	import Image from './elements/image.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number = Date.now();

	async function saveGallery(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		images.forEach((image) => {
			formData.append('images', image);
		});
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.addBeverageGallery, {
			method: 'POST',
			body: formData,
			formData: true
		});

		beveragePhotosStore.set(photosData);

		setTimeout(() => {
			version = Date.now();
		}, 3000);
	}
</script>

<section>
	<h2>{$translate('dashboard.beveragePhotos.gallery')}</h2>
	<ContentWrapper isEmpty={!$beveragePhotosStore.gallery}>
		<SavedItem>
			{#if $beveragePhotosStore.outlines?.gallery}
				{@html $beveragePhotosStore.outlines.gallery}
			{:else}
				<WarningIcon />
			{/if}
		</SavedItem>
		<SavedItem>
			{#if version}
				{#if $beveragePhotosStore.gallery}
					<Image {badge} {brand} {shortId} type="gallery" {version} />
				{:else}
					<NoImage />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		<Dropzone isMultiple save={saveGallery} />
		{#if version && $beveragePhotosStore.gallery}
			<GalleryThumbs {version} />
		{/if}
	</ContentWrapper>
</section>
