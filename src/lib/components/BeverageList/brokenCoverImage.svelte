<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { ContainerType } from '$lib/utils/enums/Beverage.enum';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let type: ContainerType;
</script>

<img src="{PHOTO_SERVER}/broken-{type}.svg" alt={$translate('landingPage.imageNotFound')} />

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
