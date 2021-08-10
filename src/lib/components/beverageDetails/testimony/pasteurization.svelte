<script lang="ts">
	import { translate } from 'svelte-intl';
	import isBoolean from 'lodash/isBoolean.js';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.pasteurization}
	<dt>
		{$translate('beverage.testimonial.pasteurization')}
	</dt>
	<dd>
		{#if isBoolean($beverage.pasteurization.label)}
			<em class="label">
				{$translate($beverage.pasteurization.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean($beverage.pasteurization.producer)}
			<em class="producer">
				{$translate($beverage.pasteurization.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean($beverage.pasteurization.editorial)}
			<em class="editorial">
				{$translate($beverage.pasteurization.editorial ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
