<script lang="ts">
	import { beveragePhotosStore } from '../utils/stores';

	export let isViewFromAbove: boolean = false;
</script>

<div class:isEmpty={!$beveragePhotosStore?.cover?.height} class:isViewFromAbove>
	<slot
		cover={$beveragePhotosStore?.cover}
		coverOutline={$beveragePhotosStore?.outlines?.cover}
		gallery={$beveragePhotosStore?.gallery}
		galleryOutline={$beveragePhotosStore?.outlines?.gallery}
		viewFromAbove={$beveragePhotosStore?.viewFromAbove}
	/>
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	div.isEmpty {
		height: 54rem;
	}

	div.isViewFromAbove {
		height: 26.4rem;
	}

	div :global(.icon-warning) {
		fill: var(--color-warning);
		transform: scale(2) translateY(-6.5rem);
		opacity: 0.5;
	}
</style>
