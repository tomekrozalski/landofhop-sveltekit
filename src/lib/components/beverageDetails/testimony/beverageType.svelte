<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';
</script>

{#if $beverage.beverageType}
	<dt>
		{$translate('beverage.testimonial.beverageType')}
	</dt>
	<dd>
		{#if $beverage.beverageType.label}
			<MarkLanguage label tag="em" name={$beverage.beverageType.label} />
		{/if}
		{#if $beverage.beverageType.producer}
			<MarkLanguage producer tag="em" name={$beverage.beverageType.producer} />
		{/if}
	</dd>
{/if}
