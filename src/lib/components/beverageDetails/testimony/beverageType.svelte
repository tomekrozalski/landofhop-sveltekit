<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';

	export let details: Details;
	const { beverageType } = details;
</script>

{#if beverageType}
	<dt>
		{$translate('beverage.testimonial.beverageType')}
	</dt>
	<dd>
		{#if beverageType.label}
			<MarkLanguage label tag="em" name={beverageType.label} />
		{/if}
		{#if beverageType.producer}
			<MarkLanguage producer tag="em" name={beverageType.producer} />
		{/if}
	</dd>
{/if}
