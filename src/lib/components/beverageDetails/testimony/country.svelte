<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import MarkLanguage from '$lib/elements/markLanguage.svelte';

	export let details: Details;
	const { place } = details;
</script>

{#if place}
	<dt>
		{$translate('beverage.testimonial.country')}
	</dt>
	<dd>
		{#if place.label}
			<MarkLanguage label tag="em" name={place.label.country} />
		{/if}
		{#if place.producer}
			<MarkLanguage producer tag="em" name={place.producer.country} />
		{/if}
		{#if place.editorial}
			<MarkLanguage editorial tag="em" name={place.editorial.country} />
		{/if}
	</dd>
{/if}
