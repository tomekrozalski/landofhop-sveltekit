<script>
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
	import { ContainerType } from '$lib/utils/enums/Beverage.enum';
</script>

<img
	alt={$translate('homePage.imageNotFound')}
	src="{PHOTO_SERVER}/broken-{$beveragePhotosStore.type ?? ContainerType.bottle}.svg"
/>

<style>
	img {
		height: 80%;
		margin: 4rem 0;
		fill: var(--color-grey-1);
	}
</style>
