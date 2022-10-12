<script lang="ts">
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$constants';
	import type { ContainerType } from '$types/enums/Beverage.enum';

	export let type: ContainerType;
</script>

<img src="{PHOTO_SERVER}/broken-{type}.svg" alt={$translate('beverageList.imageNotFound')} />

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
