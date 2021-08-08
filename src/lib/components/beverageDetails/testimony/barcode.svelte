<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.barcode}
	<dt>
		{$translate('beverage.testimonial.barcode')}
	</dt>
	<dd>
		<em class="label">{$beverage.barcode}</em>
	</dd>
{/if}
