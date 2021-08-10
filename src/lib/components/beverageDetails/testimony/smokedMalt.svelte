<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { smokedMalt } = details;
</script>

{#if smokedMalt}
	<dt>
		{$translate('beverage.testimonial.smokedMalt')}
	</dt>
	<dd>
		{#if smokedMalt.label}
			<em class="label">
				{$translate('global.confirmation')}
			</em>
		{/if}
		{#if smokedMalt.producer}
			<em class="producer">
				{$translate('global.confirmation')}
			</em>
		{/if}
	</dd>
{/if}
