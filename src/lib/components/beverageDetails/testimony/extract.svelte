<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { extract } = details;
</script>

{#if extract}
	<dt>
		{$translate('beverage.testimonial.extract')}
	</dt>
	<dd>
		{#if extract.label}
			<em class="label">
				{$translate('beverage.testimonial.extract.value', extract.label)}
			</em>
		{/if}
		{#if extract.producer}
			<em class="producer">
				{$translate('beverage.testimonial.extract.value', extract.producer)}
			</em>
		{/if}
	</dd>
{/if}
