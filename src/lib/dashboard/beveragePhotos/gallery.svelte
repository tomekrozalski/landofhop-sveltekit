<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { PhotosData as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';
	import Dropzone from './elements/dropzone/dropzone.svelte';
	import ContentWrapper from './elements/contentWrapper.svelte';
	import SavedItem from './elements/savedItem.svelte';
	import NoImage from './elements/noImage.svelte';
	import GalleryThumbs from './elements/galleryThumbs.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number = Date.now();

	async function saveGallery(images: File[]) {
		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		images.forEach((image) => {
			formData.append('images', image);
		});
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await serverCall(fetch, Endpoints.addBeverageGallery, {
			method: 'POST',
			body: formData,
			formData: true
		});

		beveragePhotosStore.set(photosData);
		version = Date.now();
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
			{#if $beveragePhotosStore.gallery}
				<img
					alt=""
					src="{PHOTO_SERVER}/{brand}/{badge}/{shortId}/container/webp/2x/01.webp?v={version}"
				/>
			{:else}
				<NoImage />
			{/if}
		</SavedItem>
		<Dropzone isMultiple save={saveGallery} />
		{#if $beveragePhotosStore.gallery}
			<GalleryThumbs {version} />
		{/if}
	</ContentWrapper>
</section>
