<script>
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
	import { beveragePhotosStore } from '$lib/dashboard/utils/stores';
</script>

<img
	alt={$translate('landingPage.imageNotFound')}
	src="{PHOTO_SERVER}/broken-{$beveragePhotosStore.type}.svg"
/>

<style>
	img {
		height: 80%;
		margin: 4rem 0;
		fill: var(--color-grey-1);
	}
</style>
