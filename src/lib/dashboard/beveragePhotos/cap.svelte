<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import apiCall, { Endpoints } from '$lib/utils/api/call';
	import type { PhotosDataWithContainerType as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { ContainerType } from '$lib/utils/enums/Beverage.enum';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/inlineSpinner.svelte';
	import Dropzone from './elements/dropzone/dropzone.svelte';
	import ContentWrapper from './elements/contentWrapper.svelte';
	import SavedItem from './elements/savedItem.svelte';
	import NoCap from './elements/noCap.svelte';
	import Image from './elements/image.svelte';
	import RemoveButton from './elements/removeButton.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveCap(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.addBeverageCap, {
			method: 'POST',
			body: formData,
			formData: true
		});

		beveragePhotosStore.set(photosData);
		version = Date.now();
	}

	async function removeCap() {
		const photosData: PhotosDataTypes = await apiCall(fetch, Endpoints.removeBeverageCap, {
			method: 'DELETE',
			pathParams: [shortId]
		});
		beveragePhotosStore.set(photosData);
	}
</script>

{#if $beveragePhotosStore.type === ContainerType.bottle}
	<section>
		<h2>{$translate('dashboard.beveragePhotos.cap')}</h2>
		<ContentWrapper isCap>
			<SavedItem isCap>
				{#if version}
					{#if $beveragePhotosStore.cap}
						<RemoveButton {removeCap} />
						<Image {badge} {brand} {shortId} type="cap" {version} />
					{:else}
						<NoCap />
					{/if}
				{:else}
					<InlineSpinner isGrey />
				{/if}
			</SavedItem>
			<Dropzone save={saveCap} />
		</ContentWrapper>
	</section>
{/if}
