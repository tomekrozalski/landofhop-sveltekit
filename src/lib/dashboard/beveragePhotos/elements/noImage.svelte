<script>
	import { translate } from 'svelte-intl';
	import { PHOTO_SERVER } from '$lib/utils/constants';
</script>

<img alt={$translate('landingPage.imageNotFound')} src="{PHOTO_SERVER}/broken-bottle.svg" />

<style>
	img {
		height: 80%;
		margin: 4rem 0;
		fill: var(--color-grey-1);
	}
</style>
