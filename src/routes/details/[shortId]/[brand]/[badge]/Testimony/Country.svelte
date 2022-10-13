<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ place } = $page.data.details);
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
