<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { PhotosData as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import InlineSpinner from '$lib/elements/form/inlineSpinner.svelte';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';
	import Dropzone from './elements/dropzone/dropzone.svelte';
	import ContentWrapper from './elements/contentWrapper.svelte';
	import SavedItem from './elements/savedItem.svelte';
	import NoImage from './elements/noImage.svelte';
	import Image from './elements/image.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveCover(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('badge', badge);
		formData.append('brand', brand);
		formData.append('image', images[0]);
		formData.append('shortId', shortId);

		const photosData: PhotosDataTypes = await serverCall(fetch, Endpoints.addBeverageCover, {
			method: 'POST',
			body: formData,
			formData: true
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
