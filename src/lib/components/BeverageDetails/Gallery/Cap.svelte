<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let details: Details;
	const { badge, brand, photos, shortId } = details;
	let isOpened = false;
	const basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;
</script>

{#if photos?.cap}
	{#if isOpened}
		<button on:click={() => (isOpened = false)}>{$translate('beverage.cap.hide')}</button>
		<img
			alt={$translate('beverage.cap', { name: brand.name.value })}
			in:fade
			srcset="{basicPath}/cap/webp/1x.webp 1x, {basicPath}/cap/webp/2x.webp 2x"
			src="{basicPath}/cap/jpg/1x.jpg"
			loading="lazy"
		/>
	{:else}
		<button on:click={() => (isOpened = true)}>{$translate('beverage.cap.show')}</button>
	{/if}
{/if}

<style>
	button {
		width: 100%;
		margin-top: 2rem;
		background-color: var(--color-grey-5);
		transition: background-color var(--transition-default);
		font-size: 1.5rem;
	}

	button:hover {
		background-color: var(--color-grey-4);
	}

	img {
		display: block;
		width: 100%;
		margin-top: 1rem;
		transition: opacity var(--transition-default);
	}
</style>
