<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isBoolean } from 'lodash-es';
	import { page } from '$app/stores';

	$: ({ nitrogen } = $page.data.details);
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
