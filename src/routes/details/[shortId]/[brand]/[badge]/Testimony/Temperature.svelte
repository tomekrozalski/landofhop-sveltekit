<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';

	export let details: Details;
	const { temperature } = details;
</script>

{#if temperature}
	<dt>
		{$translate('beverage.testimonial.temperature')}
	</dt>
	<dd>
		{#if temperature.label}
			<em class="label">
				{#if temperature.label.from === temperature.label.to}
					{temperature.label.from}
				{:else}
					{temperature.label.from}-{temperature.label.to}
				{/if}
				{$translate('beverage.testimonial.temperatureUnit', {
					unit: temperature.label.unit
				})}
			</em>
		{/if}
		{#if temperature.producer}
			<em class="producer">
				{#if temperature.producer.from === temperature.producer.to}
					{temperature.producer.from}
				{:else}
					{temperature.producer.from}-{temperature.producer.to}
				{/if}
				{$translate('beverage.testimonial.temperatureUnit', {
					unit: temperature.producer.unit
				})}
			</em>
		{/if}
	</dd>
{/if}
