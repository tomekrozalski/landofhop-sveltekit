<script lang="ts">
	import { translate } from 'svelte-intl';
	import isBoolean from 'lodash.isboolean';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { pasteurization } = details;
</script>

{#if pasteurization}
	<dt>
		{$translate('beverage.testimonial.pasteurization')}
	</dt>
	<dd>
		{#if isBoolean(pasteurization.label)}
			<em class="label">
				{$translate(pasteurization.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(pasteurization.producer)}
			<em class="producer">
				{$translate(pasteurization.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(pasteurization.editorial)}
			<em class="editorial">
				{$translate(pasteurization.editorial ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
