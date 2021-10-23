<script lang="ts">
	import Markdown from '$lib/elements/markdown.svelte';

	export let notes: string;
</script>

<Markdown value={notes} />
