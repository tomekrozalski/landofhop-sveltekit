<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { postFormData } from '$lib/utils/api/communication';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import InlineSpinner from '$lib/elements/form/InlineSpinner.svelte';
	import WarningIcon from '$lib/elements/vectors/Warning.svelte';
	import { beveragePhotosStore } from '../../../../Beverage/utils/stores';
	import Dropzone from '$lib/elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from '$lib/elements/ContentWrapper.svelte';
	import SavedItem from '$lib/elements/SavedItem.svelte';
	import NoImage from '$lib/elements/NoImage.svelte';
	import Image from '$lib/elements/Image.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveCover(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await postFormData({
			path: '/api/admin/beverages/photos/addCover',
			data: formData
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
