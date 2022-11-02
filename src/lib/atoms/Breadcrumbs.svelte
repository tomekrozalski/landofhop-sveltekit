<script lang="ts">
	import marked from 'marked';

	export let steps: {
		label: string;
		link?: string;
	}[];
</script>

<nav>
	<ul>
		{#each steps as { label, link }}
			{#if link}
				<li class="withLink">
					<a data-sveltekit-prefetch="" href={link}>{@html marked.parseInline(label)}</a>
				</li>
			{:else}
				<li>
					{@html marked.parseInline(label)}
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	nav {
		background-color: var(--color-grey-4);
	}

	ul {
		display: flex;
		max-width: var(--size-container-max-width);
		margin: 0 auto;
	}

	li {
		font-size: 1.6rem;
	}

	li:not(.withLink) {
		padding: 0.5rem 1rem;
	}

	li:not(:first-of-type) {
		margin-left: 1rem;
	}

	li:not(:first-of-type)::marker {
		content: '»';
	}

	li :global(a) {
		display: block;
		padding: 0.5rem 1rem 0.4rem 1rem;
		color: var(--color-black);
		border-bottom: 0.1rem solid var(--color-grey-1);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	li :global(a:hover) {
		background-color: var(--color-brand-6);
		border-bottom-color: var(--color-brand-6);
		color: var(--color-white);
	}

	li :global(em) {
		font-style: normal;
		font-weight: var(--font-weight-medium);
	}

	@media (min-width: 1024px) {
		ul {
			padding: 0 1rem;
		}
	}
</style>
