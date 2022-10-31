<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import WarningIcon from '$lib/atoms/vectors/Warning.svelte';
	import Dropzone from '../common/Dropzone/Dropzone.svelte';
	import ContentWrapper from '../common/ContentWrapper.svelte';
	import SavedItem from '../common/SavedItem.svelte';
	import NoImage from '../common/NoImage.svelte';
	import GalleryThumbs from './GalleryThumbs.svelte';
	import Image from '../common/Image.svelte';
	import { beveragePhotosStore } from '../utils/stores';
	import type { PhotosDataTypes } from '../utils/types';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveGallery(images: File[]) {
		version = null;

		const formData = new FormData();
		images.forEach((image) => {
			formData.append('images', image);
		});

		const response = await fetch(
			`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}/api/add-gallery`,
			{
				method: 'POST',
				body: formData
			}
		);
		const photosData: PhotosDataTypes = await response.json();

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
