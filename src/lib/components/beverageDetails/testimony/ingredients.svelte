<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { label, producer } = details.ingredientsDescription ?? {};
</script>

{#if label}
	<dt>
		{$translate(
			label.complete ? 'beverage.testimonial.ingredients' : 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<em class="label">{label.value}</em>
		{#if producer && label.complete === producer.complete}
			<em class="producer">{producer.value}</em>
		{/if}
	</dd>
{/if}

{#if producer && label && label.complete !== producer.complete}
	/
{/if}

{#if producer && label?.complete !== producer.complete}
	<dt>
		{$translate(
			label.complete ? 'beverage.testimonial.ingredients' : 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<em class="producer">{producer.value}</em>
	</dd>
{/if}
