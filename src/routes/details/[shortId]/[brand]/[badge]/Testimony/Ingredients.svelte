<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	$: ({ label, producer } = $page.data.details);
</script>

{#if label}
	<dt>
		{$translate(
			label.complete ? 'beverage.testimonial.ingredients' : 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<ul>
			{#each label.list as ingredient}
				<li><span class="label">{ingredient}</span></li>
			{/each}
		</ul>
		{#if producer && label.complete === producer.complete}
			<ul>
				{#each producer.list as ingredient}
					<li><span class="producer">{ingredient}</span></li>
				{/each}
			</ul>
		{/if}
	</dd>
{/if}

{#if producer && label?.complete !== producer.complete}
	<dt>
		{$translate(
			producer.complete ? 'beverage.testimonial.ingredients' : 'beverage.testimonial.contains'
		)}
	</dt>
	<dd>
		<ul>
			{#each producer.list as ingredient}
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
