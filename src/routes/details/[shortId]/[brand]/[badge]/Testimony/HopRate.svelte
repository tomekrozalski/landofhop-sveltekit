<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ hopRate } = $page.data.details);
</script>

{#if hopRate}
	<dt>
		{$translate('beverage.testimonial.hopRate')}
	</dt>
	<dd>
		{#if hopRate.label}
			<em class="label">
				{$translate('beverage.testimonial.hopRate.value', hopRate.label)}
			</em>
		{/if}
		{#if hopRate.producer}
			<em class="producer">
				{$translate('beverage.testimonial.hopRate.value', hopRate.producer)}
			</em>
		{/if}
	</dd>
{/if}
