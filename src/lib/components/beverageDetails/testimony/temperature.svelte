<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.temperature}
	<dt>
		{$translate('beverage.testimonial.temperature')}
	</dt>
	<dd>
		{#if $beverage.temperature.label}
			<em class="label">
				{#if $beverage.temperature.label.from === $beverage.temperature.label.to}
					{$beverage.temperature.label.from}
				{:else}
					{$beverage.temperature.label.from}-{$beverage.temperature.label.to}
				{/if}
				{$translate('beverage.testimonial.temperatureUnit', {
					unit: $beverage.temperature.label.unit
				})}
			</em>
		{/if}
		{#if $beverage.temperature.producer}
			<em class="producer">
				{#if $beverage.temperature.producer.from === $beverage.temperature.producer.to}
					{$beverage.temperature.producer.from}
				{:else}
					{$beverage.temperature.producer.from}-{$beverage.temperature.producer.to}
				{/if}
				{$translate('beverage.testimonial.temperatureUnit', {
					unit: $beverage.temperature.producer.unit
				})}
			</em>
		{/if}
	</dd>
{/if}
