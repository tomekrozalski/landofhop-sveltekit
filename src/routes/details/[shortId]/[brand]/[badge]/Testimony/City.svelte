<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';

	$: ({ place } = $page.data.details);
</script>

{#if place}
	<dt>{$translate('beverage.testimonial.city')}</dt>
	<dd>
		{#if place.label}
			<MarkLanguage label tag="em" name={place.label.city} />
		{/if}
		{#if place.producer}
			<MarkLanguage producer tag="em" name={place.producer.city} />
		{/if}
		{#if place.editorial}
			<MarkLanguage editorial tag="em" name={place.editorial.city} />
		{/if}
	</dd>
{/if}
