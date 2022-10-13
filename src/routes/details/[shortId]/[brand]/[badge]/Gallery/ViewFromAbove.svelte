<script lang="ts">
	import { fade } from 'svelte/transition';
	import { translate } from 'svelte-intl';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	$: ({ badge, brand, photos, shortId } = $page.data.details);
	$: basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;

	let isOpened = false;

	afterNavigate(() => {
		isOpened = false;
	});
</script>

{#if photos?.viewFromAbove}
	{#if isOpened}
		<button on:click={() => (isOpened = false)}>{$translate('beverage.viewFromAbove.hide')}</button>
		<img
			alt={$translate('beverage.viewFromAbove', { name: brand.name.value })}
			in:fade
			srcset="{basicPath}/view-from-above/webp/1x.webp 1x, {basicPath}/view-from-above/webp/2x.webp 2x"
			src="{basicPath}/view-from-above/jpg/1x.jpg"
			loading="lazy"
		/>
	{:else}
		<button on:click={() => (isOpened = true)}>{$translate('beverage.viewFromAbove.show')}</button>
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
