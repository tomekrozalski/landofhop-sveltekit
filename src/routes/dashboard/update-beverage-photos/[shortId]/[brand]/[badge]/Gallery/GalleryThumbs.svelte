<script lang="ts">
	import { page } from '$app/stores';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { beveragePhotosStore } from '../utils/stores';

	const { badge, brand, shortId } = $page.params;
	export let version: number;
</script>

{#if $beveragePhotosStore}
	<ul>
		{#each new Array($beveragePhotosStore.gallery) as _, index}
			<li>
				<img
					alt=""
					src="{PHOTO_SERVER}/{brand}/{badge}/{shortId}/container/webp/2x/{(index + 1)
						.toString()
						.padStart(2, '0')}.webp?v={version}"
				/>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-gap: 1rem;
		justify-content: center;
		align-items: flex-end;
		width: 100%;
	}

	li {
		border: 0.2rem solid var(--color-grey-3);
		line-height: 0;
	}

	img {
		width: 100%;
	}
</style>
