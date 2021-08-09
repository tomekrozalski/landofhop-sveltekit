<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
	import FormattedList from '$lib/elements/formattedList.svelte';
</script>

{#if $beverage.alcohol}
	<dt>
		{$translate('beverage.testimonial.alcohol')}
	</dt>
	<dd>
		{#if $beverage.alcohol.label}
			<em class="label">
				{$translate('beverage.testimonial.alcohol.value', $beverage.alcohol.label)}
				{#if $beverage.alcohol.label.scope}
					{$translate(`beverage.testimonial.alcoholScope.${$beverage.alcohol.label.scope}`)}
				{/if}
			</em>
		{/if}
		{#if $beverage.alcohol.producer}
			<em class="producer">
				{$translate('beverage.testimonial.alcohol.value', $beverage.alcohol.producer)}
				{#if $beverage.alcohol.producer.scope}
					{$translate(`beverage.testimonial.alcoholScope.${$beverage.alcohol.producer.scope}`)}
				{/if}
			</em>
		{/if}
		{#if $beverage.alcohol.editorial.scope}
			<em class="editorial no-separator">
				{$translate(`beverage.testimonial.alcoholScope.${$beverage.alcohol.editorial.scope}`)}
			</em>
		{/if}
	</dd>
{/if}
