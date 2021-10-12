<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import Dropzone from '$lib/dashboard/elements/dropzone/dropzone.svelte';

	export let params: { shortId: string; brand: string; badge: string };
	const { shortId, brand, badge } = params;
</script>

<section>
	<h2>{$translate('dashboard.beveragePhotos.cover')}</h2>
	<div class="content-wrapper" class:empty={!$beveragePhotosStore.cover.height}>
		<div class="saved-item-wrapper">
			{#if $beveragePhotosStore.outlines.cover}
				{@html $beveragePhotosStore.outlines.cover}
			{:else}
				<div>Warning!</div>
			{/if}
		</div>
		<div class="saved-item-wrapper">
			{#if $beveragePhotosStore.cover}
				<img alt="" src="{PHOTO_SERVER}/{brand}/{badge}/{shortId}/cover/webp/2x.webp" />
			{:else}
				<div>BrokenContainer</div>
			{/if}
		</div>
		<Dropzone />
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

	.saved-item-wrapper {
		width: 26.4rem;
	}
</style>
