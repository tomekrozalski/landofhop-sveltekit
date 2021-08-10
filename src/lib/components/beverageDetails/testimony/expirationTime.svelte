<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.expirationDate}
	<dt>
		{$translate('beverage.testimonial.expirationTime')}
	</dt>
	<dd>
		{#if $beverage.expirationDate.label}
			<span class="label">
				{$translate(`beverage.time.${$beverage.expirationDate.label.unit}`, {
					value: $beverage.expirationDate.label.value
				})}
			</span>
		{/if}
		{#if $beverage.expirationDate.producer}
			<span class="producer">
				{$translate(`beverage.time.${$beverage.expirationDate.producer.unit}`, {
					value: $beverage.expirationDate.producer.value
				})}
			</span>
		{/if}
	</dd>
{/if}
