<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.hopRate}
	<dt>
		{$translate('beverage.testimonial.hopRate')}
	</dt>
	<dd>
		{#if $beverage.hopRate.label}
			<em class="label">
				{$translate('beverage.testimonial.hopRate.value', $beverage.hopRate.label)}
			</em>
		{/if}
		{#if $beverage.hopRate.producer}
			<em class="producer">
				{$translate('beverage.testimonial.hopRate.value', $beverage.hopRate.producer)}
			</em>
		{/if}
	</dd>
{/if}
