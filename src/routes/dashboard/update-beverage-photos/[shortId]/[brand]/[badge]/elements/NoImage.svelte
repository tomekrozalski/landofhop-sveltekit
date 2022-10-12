<script>
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { ContainerType } from '$types/enums/Beverage.enum';
	import { beveragePhotosStore } from '../stores';
</script>

<img
	alt={$translate('dashboard.beverage.photos.imageNotFound')}
	src="{PHOTO_SERVER}/broken-{$beveragePhotosStore?.type ?? ContainerType.bottle}.svg"
/>

<style>
	img {
		height: 80%;
		margin: 4rem 0;
		fill: var(--color-grey-1);
	}
</style>
