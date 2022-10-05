<script lang="ts">
	import marked from 'marked';

	export let style: string = '';
	export let value: string;
</script>

<span {style}>
	{@html marked(value)}
</span>

<style>
	span :global(p) {
		margin: 1.8rem 0;
	}

	span :global(ul) {
		margin-left: 1.6rem;
	}

	span :global(li) {
		list-style-type: square;
	}

	span :global(a) {
		color: var(--color-success);
		border-bottom: 1px solid var(--color-white);
		transition: border-color var(--transition-default);
	}

	span :global(a:hover) {
		border-color: var(--color-black);
	}
</style>
