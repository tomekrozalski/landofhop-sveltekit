<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/InlineSpinner.svelte';
	import Dropzone from './elements/Dropzone/Dropzone.svelte';
	import ContentWrapper from './elements/ContentWrapper.svelte';
	import NoWiewFromAbove from './elements/NoWiewFromAbove.svelte';
	import SavedItem from './elements/SavedItem.svelte';
	import Image from './elements/Image.svelte';
	import RemoveButton from './elements/RemoveButton.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveImage(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.addBeverageViewFromAbove, {
			method: 'POST',
			body: formData,
			formData: true
		});

		beveragePhotosStore.set(photosData);
		version = Date.now();
	}

	async function removeImage() {
		const photosData: PhotosDataTypes = await apiCall(
			fetch,
			Endpoints.removeBeverageViewFromAbove,
			{
				method: 'DELETE',
				pathParams: [shortId]
			}
		);
		beveragePhotosStore.set(photosData);
	}
</script>

<section>
	<h2>{$translate('dashboard.beveragePhotos.viewFromAbove')}</h2>
	<ContentWrapper isViewFromAbove>
		<SavedItem isViewFromAbove>
			{#if version}
				{#if $beveragePhotosStore.viewFromAbove}
					<RemoveButton {removeImage} />
					<Image {badge} {brand} {shortId} type="viewFromAbove" {version} />
				{:else}
					<NoWiewFromAbove />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		<Dropzone save={saveImage} />
	</ContentWrapper>
</section>
