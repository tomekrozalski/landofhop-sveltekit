<script lang="ts">
	import { translate } from 'svelte-intl';
	import FormattedList from '$lib/atoms/FormattedList.svelte';
	import type {
		AgedPreviousContent,
		AgedTimeUnit,
		AgedType,
		AgedWood
	} from '$types/enums/Beverage.enum';

	type Aged = {
		type?: AgedType;
		wood?: AgedWood;
		time?: {
			value: number;
			unit: AgedTimeUnit;
		};
		previousContent?: AgedPreviousContent[];
	};

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
