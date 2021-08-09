<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import FormattedList from '$lib/elements/formattedList.svelte';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
</script>

{#if $beverage.style}
	<dt>
		{$translate('beverage.testimonial.style')}
	</dt>
	<dd>
		{#if $beverage.style.label}
			<FormattedList mode="narrow" let:item data={$beverage.style.label}>
				<MarkLanguage label tag="em" name={item} />
			</FormattedList>
		{/if}
		{#if $beverage.style.producer}
			<FormattedList mode="narrow" let:item data={$beverage.style.producer}>
				<MarkLanguage producer tag="em" name={item} />
			</FormattedList>
		{/if}
		{#if $beverage.style.editorial}
			<FormattedList mode="narrow" let:item data={$beverage.style.editorial}>
				<MarkLanguage editorial tag="em" name={item} />
			</FormattedList>
		{/if}
	</dd>
{/if}
