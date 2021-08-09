<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';
</script>

{#if $beverage.isDryHopped}
	<dt>
		{$translate('beverage.testimonial.dryHopped')}
	</dt>
	<dd>
		{#if $beverage.isDryHopped.label}
			<span class="label">
				{#if $beverage.dryHopped?.label}
					<FormattedList mode="short" let:item data={$beverage.dryHopped.label}>
						<MarkLanguage label tag="em" name={item} />
					</FormattedList>
				{:else}
					<em>
						{$translate('global.confirmation')}
					</em>
				{/if}
			</span>
		{/if}
		{#if $beverage.isDryHopped.producer}
			<span class="producer">
				{#if $beverage.dryHopped?.producer}
					<FormattedList mode="short" let:item data={$beverage.dryHopped.producer}>
						<MarkLanguage producer tag="em" name={item} />
					</FormattedList>
				{:else}
					<em>
						{$translate('global.confirmation')}
					</em>
				{/if}
			</span>
		{/if}
	</dd>
{/if}
