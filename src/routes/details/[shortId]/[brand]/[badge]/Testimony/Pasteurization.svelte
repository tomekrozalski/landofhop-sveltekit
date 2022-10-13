<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isBoolean } from 'lodash-es';
	import { page } from '$app/stores';

	$: ({ pasteurization } = $page.data.details);
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
