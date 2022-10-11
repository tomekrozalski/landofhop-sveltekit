<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$types/Beverage/Details';
	import FormattedList from '$lib/atoms/FormattedList.svelte';
	import AgedItem from './AgedItem.svelte';

	export let details: Details;
	const { aged, isAged } = details;
</script>

{#if aged || isAged}
	<dt>
		{$translate('beverage.testimonial.aged')}
	</dt>
	<dd>
		{#if isAged?.label}
			<span>{$translate('global.confirmation')}</span>
		{/if}
		{#if aged?.label}
			<span class="label">
				<FormattedList mode="long" let:item data={aged.label}>
					<AgedItem {item} />
				</FormattedList>
			</span>
		{/if}
		{#if isAged?.producer}
			<span>{$translate('global.confirmation')}</span>
		{/if}
		{#if aged?.producer}
			<span class="producer">
				<FormattedList mode="long" let:item data={aged.producer}>
					<AgedItem {item} />
				</FormattedList>
			</span>
		{/if}
		{#if isAged?.editorial}
			<span>{$translate('global.confirmation')}</span>
		{/if}
		{#if aged?.editorial}
			<span class="editorial">
				<FormattedList mode="long" let:item data={aged.editorial}>
					<AgedItem {item} />
				</FormattedList>
			</span>
		{/if}
	</dd>
{/if}
