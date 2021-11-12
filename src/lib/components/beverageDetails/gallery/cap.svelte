<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let details: Details;
	const { badge, brand, photos, shortId } = details;

	const basicPath = `${PHOTO_SERVER}/${brand.badge}/${badge}/${shortId}`;
	const pathJpgRegular = `${basicPath}/cap/jpg/1x.jpg`;
	const pathJpgLarge = `${basicPath}/cap/jpg/2x.jpg`;
	const pathWebpRegular = `${basicPath}/cap/webp/1x.webp`;
	const pathWebpLarge = `${basicPath}/cap/webp/2x.webp`;
</script>

{#if photos?.cap}
	<picture>
		<source type="image/webp" srcSet="{pathWebpRegular} 1x, {pathWebpLarge} 2x" />
		<source srcSet="{pathJpgRegular} 1x, {pathJpgLarge} 2x" />
		<img
			alt={$translate('beverage.cap', { name: brand.name.value })}
			srcset="{pathJpgRegular} 1x, {pathJpgLarge} 2x"
			src={pathJpgRegular}
			loading="lazy"
		/>
	</picture>
{/if}

<style>
	picture {
		display: block;
		width: 50%;
		margin-top: 2rem;
		opacity: 0.3;
		transition: opacity var(--transition-default);
	}

	picture:hover {
		opacity: 1;
	}

	picture img {
		width: 100%;
	}
</style>
