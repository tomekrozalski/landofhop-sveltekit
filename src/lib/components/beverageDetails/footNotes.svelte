<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
</script>

<dl>
	<dt>{$translate('beverage.footnotes.added')}</dt>
	<dd>{details.added}</dd>
</dl>

<style>
	dl {
		font-size: 1.6rem;
		color: var(--color-grey-1);
	}
</style>
