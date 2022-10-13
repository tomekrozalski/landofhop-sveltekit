<script lang="ts">
	import { translate } from 'svelte-intl';
	import { isBoolean } from 'lodash-es';
	import { page } from '$app/stores';

	$: ({ smokedMalt } = $page.data.details);
</script>

{#if smokedMalt}
	<dt>
		{$translate('beverage.testimonial.smokedMalt')}
	</dt>
	<dd>
		{#if isBoolean(smokedMalt.label)}
			<em class="label">
				{$translate(smokedMalt.label ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
		{#if isBoolean(smokedMalt.producer)}
			<em class="producer">
				{$translate(smokedMalt.producer ? 'global.confirmation' : 'global.denial')}
			</em>
		{/if}
	</dd>
{/if}
