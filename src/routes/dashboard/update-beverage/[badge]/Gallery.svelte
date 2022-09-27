<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { postFormData } from '$lib/utils/api/communication';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/InlineSpinner.svelte';
	import WarningIcon from '$lib/elements/vectors/Warning.svelte';
	import Dropzone from '../elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from '../elements/ContentWrapper.svelte';
	import SavedItem from '../elements/SavedItem.svelte';
	import NoImage from '../elements/NoImage.svelte';
	import GalleryThumbs from '../elements/GalleryThumbs.svelte';
	import Image from '../elements/Image.svelte';

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

		const photosData: PhotosDataTypes = await postFormData({
			path: '/api/admin/beverages/photos/addGallery',
			data: formData
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
