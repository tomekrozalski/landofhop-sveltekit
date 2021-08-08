<script lang="ts">
	import marked from 'marked';
	import { beverage } from '$lib/utils/stores/beverage';
	import Article from './article.svelte';
</script>

<section>
	{#if $beverage.tale?.label}
		<div lang={$beverage.tale.label.language !== 'pl' ? $beverage.tale.label.language : null}>
			{@html marked($beverage.tale?.label.lead)}
			{#if $beverage.tale.label.article}
				<Article>{@html marked($beverage.tale.label.article)}</Article>
			{/if}
		</div>
	{/if}
	{#if $beverage.tale?.producer}
		<div
			class="tale-producer"
			lang={$beverage.tale.producer.language !== 'pl' ? $beverage.tale.producer.language : null}
		>
			{@html marked($beverage.tale.producer.lead)}
			{#if $beverage.tale.producer.article}
				<Article>{@html marked($beverage.tale.producer.article)}</Article>
			{/if}
		</div>
	{/if}
</section>

<style>
	section {
		grid-area: tale;
		/* margin-bottom: 1.8rem; */
	}

	.tale-producer {
		border-left: 1rem solid var(--color-producer);
		padding-left: 2rem;
	}

	div {
		margin: -1.8rem 0;
	}

	div + div {
		margin-top: 3.6rem;
	}

	div :global(p) {
		margin: 1.8rem 0;
	}
</style>
