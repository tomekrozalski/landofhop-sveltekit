<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { deleteJsonData, postFormData } from '$lib/utils/api/communication';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from 'src/oldTypes/Beverage/PhotosData';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Dropzone from './elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from './elements/ContentWrapper.svelte';
	import NoWiewFromAbove from './elements/NoWiewFromAbove.svelte';
	import SavedItem from './elements/SavedItem.svelte';
	import Image from './elements/Image.svelte';
	import RemoveButton from './elements/RemoveButton.svelte';
	import { beveragePhotosStore } from './stores';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveImage(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await postFormData({
			path: '/api/admin/beverages/photos/addViewFromAbove',
			data: formData
		});

		beveragePhotosStore.set(photosData);
		version = Date.now();
	}

	async function removeImage() {
		const photosData: PhotosDataTypes = await deleteJsonData({
			path: `/api/admin/beverages/photos/removeViewFromAbove/${shortId}`
		});

		beveragePhotosStore.set(photosData);
	}
</script>

<section>
	<h2>{$translate('dashboard.beverage.photos.viewFromAbove')}</h2>
	<ContentWrapper isViewFromAbove let:viewFromAbove>
		<SavedItem isViewFromAbove>
			{#if version}
				{#if viewFromAbove}
					<RemoveButton {removeImage} />
					<Image {badge} {brand} {shortId} type="viewFromAbove" {version} />
				{:else}
					<NoWiewFromAbove />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		{#if browser}
			<Dropzone save={saveImage} />
		{/if}
	</ContentWrapper>
</section>
