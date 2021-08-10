<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.smokedMalt}
	<dt>
		{$translate('beverage.testimonial.smokedMalt')}
	</dt>
	<dd>
		{#if $beverage.smokedMalt.label}
			<em class="label">
				{$translate('global.confirmation')}
			</em>
		{/if}
		{#if $beverage.smokedMalt.producer}
			<em class="producer">
				{$translate('global.confirmation')}
			</em>
		{/if}
	</dd>
{/if}
