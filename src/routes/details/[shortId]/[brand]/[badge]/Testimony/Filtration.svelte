<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isBoolean } from 'lodash-es';
	import { page } from '$app/stores';

	$: ({ filtration } = $page.data.details);
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
