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
	import Image from './elements/Image.svelte';
	import { beveragePhotosStore } from './stores';

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
	<h2>{$translate('dashboard.beverage.photos.cover')}</h2>
	<ContentWrapper let:cover let:coverOutline>
		<SavedItem>
			{#if coverOutline}
				{@html coverOutline}
			{:else}
				<WarningIcon />
			{/if}
		</SavedItem>
		<SavedItem>
			{#if version}
				{#if cover}
					<Image {badge} {brand} {shortId} type="cover" {version} />
				{:else}
					<NoImage />
				{/if}
			{:else}
				<InlineSpinner isGrey />
			{/if}
		</SavedItem>
		{#if browser}
			<Dropzone save={saveCover} />
		{/if}
	</ContentWrapper>
</section>
