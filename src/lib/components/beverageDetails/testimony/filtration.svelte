<script lang="ts">
	import { translate } from 'svelte-intl';
	import isBoolean from '$lib/utils/helpers/isBoolean';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { filtration } = details;
</script>

{#if filtration}
	<dt>
		{$translate('beverage.testimonial.filtration')}
	</dt>
	<dd>
		{#if isBoolean(filtration.label)}
			<em class="label">
				{$translate(filtration.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(filtration.producer)}
			<em class="producer">
				{$translate(filtration.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(filtration.editorial)}
			<em class="editorial">
				{$translate(filtration.editorial ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
