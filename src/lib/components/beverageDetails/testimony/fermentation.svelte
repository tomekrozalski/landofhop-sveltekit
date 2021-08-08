<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';
</script>

{#if $beverage.fermentation}
	<dt>
		{$translate('beverage.testimonial.fermentation')}
	</dt>
	<dd>
		{#if $beverage.fermentation.label}
			<FormattedList mode="short" let:item data={$beverage.fermentation.label}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if $beverage.fermentation.producer}
			<FormattedList mode="short" let:item data={$beverage.fermentation.producer}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
		{#if $beverage.fermentation.editorial}
			<FormattedList mode="short" let:item data={$beverage.fermentation.editorial}>
				<em>{$translate(`beverage.testimonial.fermentationType.${item}`)}</em>
			</FormattedList>
		{/if}
	</dd>
{/if}
