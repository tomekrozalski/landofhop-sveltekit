<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from 'src/oldTypes/Beverage/Details';
	import FormattedList from '$lib/atoms/FormattedList.svelte';

	export let details: Details;
	const { price } = details;
</script>

{#if price}
	<dt>
		{$translate('beverage.testimonial.price')}
	</dt>
	<dd>
		{#if price.label}
			<em class="label">
				<FormattedList mode="narrow" let:item data={price.label}>
					<em>
						{new Intl.NumberFormat('pl', {
							style: 'currency',
							currency: item.currency
						}).format(item.value)}
					</em>
				</FormattedList>
			</em>
		{/if}
		{#if price.producer}
			<em class="producer">
				<FormattedList mode="narrow" let:item data={price.producer}>
					<em>
						{new Intl.NumberFormat('pl', {
							style: 'currency',
							currency: item.currency
						}).format(item.value)}
					</em>
				</FormattedList>
			</em>
		{/if}
		{#if price.editorial}
			<em class="editorial">
				<FormattedList mode="narrow" let:item data={price.editorial}>
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
