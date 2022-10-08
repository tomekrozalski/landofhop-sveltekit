<script lang="ts">
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let badge: string;
	export let brand: string;
	export let shortId: string;
	export let type: 'cover' | 'gallery' | 'viewFromAbove';
	export let version: number;

	const basePath = `${PHOTO_SERVER}/${brand}/${badge}/${shortId}`;
</script>

{#if type === 'cover'}
	<img alt="" src="{basePath}/cover/webp/2x.webp?v={version}" />
{/if}

{#if type === 'gallery'}
	<img alt="" src="{basePath}/container/webp/2x/01.webp?v={version}" />
{/if}

{#if type === 'viewFromAbove'}
	<img alt="" src="{basePath}/view-from-above/webp/2x.webp?v={version}" />
{/if}
