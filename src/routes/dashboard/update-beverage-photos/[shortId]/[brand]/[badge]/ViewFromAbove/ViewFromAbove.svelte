<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import InlineSpinner from '$lib/atoms/spinners/Inline.svelte';
	import Dropzone from '../common/Dropzone/Dropzone.svelte';
	import ContentWrapper from '../common/ContentWrapper.svelte';
	import NoWiewFromAbove from './NoWiewFromAbove.svelte';
	import SavedItem from '../common/SavedItem.svelte';
	import Image from '../common/Image.svelte';
	import RemoveButton from './RemoveButton.svelte';
	import { beveragePhotosStore } from '../utils/stores';
	import type { PhotosDataTypes } from '../utils/types';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveImage(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('image', images[0]);

		const response = await fetch(
			`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}/api/add-view-from-above`,
			{ method: 'POST', body: formData }
		);
		const photosData: PhotosDataTypes = await response.json();

		beveragePhotosStore.set(photosData);
		version = Date.now();
	}

	async function removeImage() {
		const response = await fetch(
			`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}/api/remove-view-from-above`,
			{ method: 'DELETE' }
		);
		const photosData: PhotosDataTypes = await response.json();

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
