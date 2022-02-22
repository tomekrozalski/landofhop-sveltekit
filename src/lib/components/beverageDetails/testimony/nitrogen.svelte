<script lang="ts">
	import { translate } from 'svelte-intl';
	import isBoolean from 'lodash/isBoolean';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { nitrogen } = details;
</script>

{#if nitrogen}
	<dt>
		{$translate('beverage.testimonial.nitrogen')}
	</dt>
	<dd>
		{#if isBoolean(nitrogen.label)}
			<em class="label">
				{$translate(nitrogen.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(nitrogen.producer)}
			<em class="producer">
				{$translate(nitrogen.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(nitrogen.editorial)}
			<em class="editorial">
				{$translate(nitrogen.editorial ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
