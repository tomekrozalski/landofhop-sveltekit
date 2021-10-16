<script lang="ts">
	import { translate } from 'svelte-intl';
	import { getStores, navigating, page, session } from '$app/stores';
	import serverCall, { Endpoints } from '$lib/utils/helpers/serverCall';
	import type { PhotosData as PhotosDataTypes } from '$lib/utils/types/Beverage/PhotosData';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import WarningIcon from '$lib/elements/vectors/warning.svelte';
	import Dropzone from '$lib/dashboard/elements/dropzone/dropzone.svelte';

	const { badge, brand, shortId } = $page.params;
	let version: number = Date.now();

	async function saveCover(images: File[]) {
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
	<div class="content-wrapper" class:empty={!$beveragePhotosStore.cover?.height}>
		<div class="saved-item-wrapper">
			{#if $beveragePhotosStore.outlines?.cover}
				{@html $beveragePhotosStore.outlines.cover}
			{:else}
				<WarningIcon />
			{/if}
		</div>
		<div class="saved-item-wrapper">
			{#if $beveragePhotosStore.cover}
				<img alt="" src="{PHOTO_SERVER}/{brand}/{badge}/{shortId}/cover/webp/2x.webp?v={version}" />
			{:else}
				<img
					alt={$translate('landingPage.imageNotFound')}
					class="image-not-found"
					src="{PHOTO_SERVER}/broken-bottle.svg"
				/>
			{/if}
		</div>
		<Dropzone save={saveCover} />
	</div>
</section>

<style>
	.content-wrapper {
		display: flex;
		gap: 2rem;
	}

	.content-wrapper.empty {
		height: 50rem;
	}

	.content-wrapper :global(.icon-warning) {
		fill: var(--color-warning);
		transform: scale(2) translateY(-6.5rem);
		opacity: 0.5;
	}

	.saved-item-wrapper {
		width: 26.4rem;
	}

	img.image-not-found {
		height: 80%;
		margin: 4rem 0;
		fill: var(--color-grey-1);
	}
</style>
