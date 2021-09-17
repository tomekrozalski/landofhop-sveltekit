<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { place } = details;
</script>

{#if place}
	<dt>
		{$translate('beverage.testimonial.country')}
	</dt>
	<dd>
		{#if place.label}
			<em class="label">{$translate(`country.${place.label.country}`)}</em>
		{/if}
		{#if place.producer}
			<em class="producer">{$translate(`country.${place.producer.country}`)}</em>
		{/if}
		{#if place.editorial}
			<em class="editorial">{$translate(`country.${place.editorial.country}`)}</em>
		{/if}
	</dd>
{/if}
