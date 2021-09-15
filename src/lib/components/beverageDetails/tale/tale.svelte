<script lang="ts">
	import marked from 'marked';
	import type { Details } from '$lib/utils/types/Beverage/Details';
	import Article from './article.svelte';

	export let details: Details;
	const { tale } = details;
</script>

{#if tale}
	{#if tale?.label?.length}
		{#each tale?.label as singleTale}
			<section lang={singleTale.language !== 'pl' ? singleTale.language : null}>
				{@html marked(singleTale.lead)}
				{#if singleTale.article}
					<Article>{@html marked(singleTale.article)}</Article>
				{/if}
			</section>
		{/each}
	{/if}
	{#if tale?.producer}
		<section
			class="tale-producer"
			lang={tale.producer.language !== 'pl' ? tale.producer.language : null}
		>
			{@html marked(tale.producer.lead)}
			{#if tale.producer.article}
				<Article>{@html marked(tale.producer.article)}</Article>
			{/if}
		</section>
	{/if}
{/if}

<style>
	.tale-producer {
		border-left: 1rem solid var(--color-producer);
		padding-left: 2rem;
	}

	section :global(p) {
		margin: 1.8rem 0;
	}
</style>
