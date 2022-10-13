<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ extract } = $page.data.details);
</script>

{#if extract}
	<dt>
		{$translate('beverage.testimonial.extract')}
	</dt>
	<dd>
		{#if extract.label}
			<em class="label">
				{$translate('beverage.testimonial.extract.value', {
					...extract.label,
					value: new Intl.NumberFormat('pl').format(extract.label.value)
				})}
			</em>
		{/if}
		{#if extract.producer}
			<em class="producer">
				{$translate('beverage.testimonial.extract.value', {
					...extract.producer,
					value: new Intl.NumberFormat('pl').format(extract.producer.value)
				})}
			</em>
		{/if}
	</dd>
{/if}
