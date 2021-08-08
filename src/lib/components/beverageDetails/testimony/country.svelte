<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
</script>

{#if $beverage.place}
	<dt>
		{$translate('beverage.testimonial.country')}
	</dt>
	<dd>
		{#if $beverage.place.label}
			<MarkLanguage label tag="em" name={$beverage.place.label.country} />
		{/if}
		{#if $beverage.place.producer}
			<MarkLanguage producer tag="em" name={$beverage.place.producer.country} />
		{/if}
		{#if $beverage.place.editorial}
			<MarkLanguage editorial tag="em" name={$beverage.place.editorial.country} />
		{/if}
	</dd>
{/if}
