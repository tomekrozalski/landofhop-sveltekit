<script lang="ts">
	import marked from 'marked';
	import { beverage } from '$lib/utils/stores/beverage';
	import Article from './article.svelte';
</script>

{#if $beverage.tale}
	{#if $beverage.tale?.label}
		<section lang={$beverage.tale.label.language !== 'pl' ? $beverage.tale.label.language : null}>
			{@html marked($beverage.tale?.label.lead)}
			{#if $beverage.tale.label.article}
				<Article>{@html marked($beverage.tale.label.article)}</Article>
			{/if}
		</section>
	{/if}
	{#if $beverage.tale?.producer}
		<section
			class="tale-producer"
			lang={$beverage.tale.producer.language !== 'pl' ? $beverage.tale.producer.language : null}
		>
			{@html marked($beverage.tale.producer.lead)}
			{#if $beverage.tale.producer.article}
				<Article>{@html marked($beverage.tale.producer.article)}</Article>
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
