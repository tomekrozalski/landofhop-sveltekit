<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { barcode } = details;
</script>

{#if barcode}
	<dt>
		{$translate('beverage.testimonial.barcode')}
	</dt>
	<dd>
		<em class="label">{barcode}</em>
	</dd>
{/if}
