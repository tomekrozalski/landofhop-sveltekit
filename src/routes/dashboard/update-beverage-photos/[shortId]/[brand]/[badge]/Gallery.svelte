<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { postFormData } from '$lib/utils/api/communication';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from 'src/oldTypes/Beverage/PhotosData';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import WarningIcon from '$lib/atoms/vectors/Warning.svelte';
	import Dropzone from './elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from './elements/ContentWrapper.svelte';
	import SavedItem from './elements/SavedItem.svelte';
	import NoImage from './elements/NoImage.svelte';
	import GalleryThumbs from './elements/GalleryThumbs.svelte';
	import Image from './elements/Image.svelte';
	import { beveragePhotosStore } from './stores';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

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
	<h2>{$translate('dashboard.beverage.photos.gallery')}</h2>
	<ContentWrapper let:gallery let:galleryOutline>
		<SavedItem>
			{#if galleryOutline}
				{@html galleryOutline}
			{:else}
				<WarningIcon />
			{/if}
		</SavedItem>
		<SavedItem>
			{#if version}
				{#if gallery}
					<Image {badge} {brand} {shortId} type="gallery" {version} />
				{:else}
					<NoImage />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		{#if browser}
			<Dropzone isMultiple save={saveGallery} />
		{/if}
		{#if version && gallery}
			<GalleryThumbs {version} />
		{/if}
	</ContentWrapper>
</section>
