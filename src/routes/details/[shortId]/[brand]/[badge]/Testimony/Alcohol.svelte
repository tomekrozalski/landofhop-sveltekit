<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ alcohol } = $page.data.details);
</script>

{#if alcohol}
	<dt>
		{$translate('beverage.testimonial.alcohol')}
	</dt>
	<dd>
		{#if alcohol.label}
			<em class="label">
				{$translate('beverage.testimonial.alcohol.value', {
					...alcohol.label,
					value: new Intl.NumberFormat('pl').format(alcohol.label.value)
				})}
				{#if alcohol.label.scope}
					{$translate(`beverage.testimonial.alcoholScope.${alcohol.label.scope}`)}
				{/if}
			</em>
		{/if}
		{#if alcohol.producer}
			<em class="producer">
				{$translate('beverage.testimonial.alcohol.value', {
					...alcohol.producer,
					value: new Intl.NumberFormat('pl').format(alcohol.producer.value)
				})}
				{#if alcohol.producer.scope}
					{$translate(`beverage.testimonial.alcoholScope.${alcohol.producer.scope}`)}
				{/if}
			</em>
		{/if}
		{#if alcohol.editorial?.scope}
			<em class="editorial no-separator">
				{$translate(`beverage.testimonial.alcoholScope.${alcohol.editorial.scope}`)}
			</em>
		{/if}
	</dd>
{/if}
