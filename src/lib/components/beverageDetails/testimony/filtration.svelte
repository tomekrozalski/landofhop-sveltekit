<script lang="ts">
	import { translate } from 'svelte-intl';
	import isBoolean from 'lodash/isBoolean.js';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.filtration}
	<dt>
		{$translate('beverage.testimonial.filtration')}
	</dt>
	<dd>
		{#if isBoolean($beverage.filtration.label)}
			<em class="label">
				{$translate($beverage.filtration.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean($beverage.filtration.producer)}
			<em class="producer">
				{$translate($beverage.filtration.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean($beverage.filtration.editorial)}
			<em class="editorial">
				{$translate($beverage.filtration.editorial ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
