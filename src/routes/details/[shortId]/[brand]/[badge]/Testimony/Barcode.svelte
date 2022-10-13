<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ barcode } = $page.data.details);
</script>

{#if barcode}
	<dt>
		{$translate('beverage.testimonial.barcode')}
	</dt>
	<dd>
		<em class="label">{barcode}</em>
	</dd>
{/if}
