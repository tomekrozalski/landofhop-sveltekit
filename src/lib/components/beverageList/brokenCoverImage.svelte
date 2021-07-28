<script lang="ts">
	export let type: ContainerType;

	import type { ContainerType } from '$lib/utils/enums/Beverage';
	import { PHOTO_SERVER } from '$lib/utils/constants';
</script>

<img src={`${PHOTO_SERVER}/broken-${type}.svg`} alt="Nie znaleziono zdjęcia" />

<style>
	img {
		height: 22rem;
		margin: 4rem 0;
		transform: scale(1);
		transition: transform var(--transition-default);
		fill: var(--color-grey-1);
	}

	@media (--xl) {
		img {
			height: 28rem;
		}
	}
</style>
