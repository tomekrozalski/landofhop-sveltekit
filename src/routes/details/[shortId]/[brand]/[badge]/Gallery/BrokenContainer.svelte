<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';
	import { PHOTO_SERVER } from '$lib/utils/constants';

	export let details: Details;
</script>

<img
	src={`${PHOTO_SERVER}/broken-${details.container.type}.svg`}
	alt={$translate('beverage.header.brewed')}
/>

<style>
	img {
		height: 28rem;
		margin: 4rem 0;
		transform: scale(1);
		transition: transform var(--transition-default);
		fill: var(--color-grey-3);
	}
</style>
