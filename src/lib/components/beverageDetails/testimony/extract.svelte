<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

{#if $beverage.extract}
	<dt>
		{$translate('beverage.testimonial.extract')}
	</dt>
	<dd>
		{#if $beverage.extract.label}
			<em class="label">
				{$translate('beverage.testimonial.extract.value', $beverage.extract.label)}
			</em>
		{/if}
		{#if $beverage.extract.producer}
			<em class="producer">
				{$translate('beverage.testimonial.extract.value', $beverage.extract.producer)}
			</em>
		{/if}
	</dd>
{/if}
