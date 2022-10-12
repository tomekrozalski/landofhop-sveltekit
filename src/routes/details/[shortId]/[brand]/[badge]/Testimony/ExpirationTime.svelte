<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';

	export let details: Details;
	const { expirationDate } = details;
</script>

{#if expirationDate}
	<dt>
		{$translate('beverage.testimonial.expirationTime')}
	</dt>
	<dd>
		{#if expirationDate.label}
			<span class="label">
				{$translate(`beverage.time.${expirationDate.label.unit}`, {
					value: expirationDate.label.value
				})}
			</span>
		{/if}
		{#if expirationDate.producer}
			<span class="producer">
				{$translate(`beverage.time.${expirationDate.producer.unit}`, {
					value: expirationDate.producer.value
				})}
			</span>
		{/if}
	</dd>
{/if}
