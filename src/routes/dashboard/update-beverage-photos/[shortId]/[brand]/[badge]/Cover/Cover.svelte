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
	import Image from '../common/Image.svelte';
	import { beveragePhotosStore } from '../utils/stores';
	import type { PhotosDataTypes } from '../utils/types';

	const { badge, brand, shortId } = $page.params;
	let version: number | null = Date.now();

	async function saveCover(images: File[]) {
		version = null;

		const formData = new FormData();
		formData.append('image', images[0]);

		const response = await fetch(
			`/dashboard/update-beverage-photos/${shortId}/${brand}/${badge}/api/add-cover`,
			{
				method: 'POST',
				body: formData
			}
		);
		const photosData: PhotosDataTypes = await response.json();

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
