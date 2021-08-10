<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import FormattedList from '$lib/elements/formattedList.svelte';
	import AgedItem from './agedItem.svelte';

	export let details: Details;
	const { aged, isAged } = details;
</script>

{#if aged}
	<dt>
		{$translate('beverage.testimonial.aged')}
	</dt>
	<dd>
		{#if isAged?.label}
			<span>
				{#if aged?.label}
					<FormattedList mode="long" let:item data={aged.label}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
		{#if isAged?.producer}
			<span>
				{#if aged?.producer}
					<FormattedList mode="long" let:item data={aged.producer}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
		{#if isAged?.editorial}
			<span>
				{#if aged?.editorial}
					<FormattedList mode="long" let:item data={aged.editorial}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
	</dd>
{/if}
