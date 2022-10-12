<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';

	export let details: Details;
	const { place } = details;
</script>

{#if place}
	<dt>
		{$translate('beverage.testimonial.country')}
	</dt>
	<dd>
		{#if place.label}
			<em class="label">{place.label.country}</em>
		{/if}
		{#if place.producer}
			<em class="producer">{place.producer.country}</em>
		{/if}
		{#if place.editorial}
			<em class="editorial">{place.editorial.country}</em>
		{/if}
	</dd>
{/if}
