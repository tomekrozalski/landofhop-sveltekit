<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import FormattedList from '$lib/elements/formattedList.svelte';

	export let details: Details;
	const { fermentation } = details;
</script>

{#if fermentation}
	<dt>
		{$translate('beverage.testimonial.fermentation')}
	</dt>
	<dd>
		{#if fermentation.label}
			<FormattedList mode="short" let:item data={fermentation.label}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if fermentation.producer}
			<FormattedList mode="short" let:item data={fermentation.producer}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if fermentation.editorial}
			<FormattedList mode="short" let:item data={fermentation.editorial}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
	</dd>
{/if}
