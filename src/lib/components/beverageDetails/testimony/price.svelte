<script lang="ts">
	import { translate } from 'svelte-intl';
	import { beverage } from '$lib/utils/stores/beverage';
	import FormattedList from '$lib/elements/formattedList.svelte';
</script>

{#if $beverage.price}
	<dt>
		{$translate('beverage.testimonial.price')}
	</dt>
	<dd>
		{#if $beverage.price.label}
			<em class="label">
				<FormattedList mode="narrow" let:item data={$beverage.price.label}>
					<em>
						{new Intl.NumberFormat('pl', {
							style: 'currency',
							currency: item.currency
						}).format(item.value)}
					</em>
				</FormattedList>
			</em>
		{/if}
		{#if $beverage.price.producer}
			<em class="producer">
				<FormattedList mode="narrow" let:item data={$beverage.price.producer}>
					<em>
						{new Intl.NumberFormat('pl', {
							style: 'currency',
							currency: item.currency
						}).format(item.value)}
					</em>
				</FormattedList>
			</em>
		{/if}
		{#if $beverage.price.editorial}
			<em class="editorial">
				<FormattedList mode="narrow" let:item data={$beverage.price.editorial}>
					<em>
						{new Intl.NumberFormat('pl', {
							style: 'currency',
							currency: item.currency
						}).format(item.value)}
					</em>
				</FormattedList>
			</em>
		{/if}
	</dd>
{/if}
