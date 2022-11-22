<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ ingredients } = $page.data.details);
</script>

{#if ingredients?.label}
	<dt>
		{$translate(
			ingredients.label.complete
				? 'beverage.testimonial.ingredients'
				: 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<ul>
			{#each ingredients.label.list as ingredient}
				<li><span class="label">{ingredient}</span></li>
			{/each}
		</ul>
		{#if ingredients.producer && ingredients.label?.complete === ingredients.producer?.complete}
			<ul>
				{#each ingredients.producer?.list as ingredient}
					<li><span class="producer">{ingredient}</span></li>
				{/each}
			</ul>
		{/if}
	</dd>
{/if}

{#if ingredients?.producer && ingredients?.label?.complete !== ingredients?.producer?.complete}
	<dt>
		{$translate(
			ingredients.producer.complete
				? 'beverage.testimonial.ingredients'
				: 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<ul>
			{#each ingredients.producer.list as ingredient}
				<li><span class="producer">{ingredient}</span></li>
			{/each}
		</ul>
	</dd>
{/if}

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
	}

	li {
		font-weight: var(--font-weight-regular);
	}

	li::before {
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		content: '';
		margin-right: 0.6rem;
		background-color: var(--color-black);
		position: relative;
		bottom: 0.2rem;
	}

	li:not(:last-of-type)::after {
		content: ',';
		margin-right: 0.4rem;
	}
</style>
