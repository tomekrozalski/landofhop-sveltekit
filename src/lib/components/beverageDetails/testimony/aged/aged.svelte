<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import FormattedList from '$lib/elements/formattedList.svelte';
	import AgedItem from './agedItem.svelte';
</script>

{#if $beverage.aged}
	<dt>
		{$translate('beverage.testimonial.aged')}
	</dt>
	<dd>
		{#if $beverage.isAged?.label}
			<span>
				{#if $beverage.aged?.label}
					<FormattedList mode="long" let:item data={$beverage.aged.label}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
		{#if $beverage.isAged?.producer}
			<span>
				{#if $beverage.aged?.producer}
					<FormattedList mode="long" let:item data={$beverage.aged.producer}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
		{#if $beverage.isAged?.editorial}
			<span>
				{#if $beverage.aged?.editorial}
					<FormattedList mode="long" let:item data={$beverage.aged.editorial}>
						<AgedItem {item} />
					</FormattedList>
				{:else}
					{$translate('global.confirmation')}
				{/if}
			</span>
		{/if}
	</dd>
{/if}
