<script lang="ts">
	import Markdown from '$lib/elements/Markdown.svelte';

	export let notes: string;
</script>

<Markdown value={notes} />
