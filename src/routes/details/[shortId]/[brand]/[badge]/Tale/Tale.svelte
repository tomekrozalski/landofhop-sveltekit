<script lang="ts">
	import { page } from '$app/stores';
	import Markdown from '$lib/atoms/Markdown.svelte';
	import Article from './Article.svelte';

	$: ({ tale } = $page.data.details);
</script>

{#if tale}
	{#if tale?.label?.length}
		{#each tale?.label as singleTale}
			<section lang={singleTale.language !== 'pl' ? singleTale.language : null}>
				<Markdown value={singleTale.lead} />
				{#if singleTale.article}
					<Article>
						<Markdown value={singleTale.article} />
					</Article>
				{/if}
			</section>
		{/each}
	{/if}
	{#if tale?.producer}
		<section
			class="tale-producer"
			lang={tale.producer.language !== 'pl' ? tale.producer.language : null}
		>
			<Markdown value={tale.producer.lead} />
			{#if tale.producer.article}
				<Article>
					<Markdown value={tale.producer.article} />
				</Article>
			{/if}
		</section>
	{/if}
{/if}

<style>
	.tale-producer {
		margin: 2rem 0;
		border-left: 1rem solid var(--color-producer);
		padding-left: 2rem;
	}
</style>
