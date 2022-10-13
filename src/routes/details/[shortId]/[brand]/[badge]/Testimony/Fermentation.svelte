<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
	import FormattedList from '$lib/atoms/FormattedList.svelte';

	$: ({ fermentation } = $page.data.details);
</script>

{#if fermentation}
	<dt>
		{$translate('beverage.testimonial.fermentation')}
	</dt>
	<dd>
		{#if fermentation.label}
			<FormattedList mode="short" let:item data={fermentation.label}>
				<em class="label">{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if fermentation.producer}
			<FormattedList mode="short" let:item data={fermentation.producer}>
				<em class="producer">{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if fermentation.editorial}
			<FormattedList mode="short" let:item data={fermentation.editorial}>
				<em class="editorial">{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
	</dd>
{/if}
