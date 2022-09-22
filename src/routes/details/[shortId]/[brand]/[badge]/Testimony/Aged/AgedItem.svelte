<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Aged } from '$lib/utils/types/Beverage/fragments';
	import FormattedList from '$lib/elements/FormattedList.svelte';

	export let item: Aged;
	let { previousContent, time, type, wood } = item;
</script>

{#if time}
	{$translate(`beverage.time.${time.unit}`, { value: time.value })}
{/if}

{#if wood}
	{$translate(`beverage.testimonial.aged.${type}.${wood}`)}
{/if}

{#if !wood && type}
	{$translate(`beverage.testimonial.aged.${type}`)}
{/if}

{#if previousContent}
	{$translate('beverage.testimonial.aged.previousContent.name')}
	<FormattedList mode="short" let:item data={previousContent}>
		{$translate('beverage.testimonial.aged.previousContent.content', { item })}
	</FormattedList>
{/if}
