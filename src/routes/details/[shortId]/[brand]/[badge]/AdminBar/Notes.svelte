<script lang="ts">
	import Markdown from '$lib/atoms/Markdown.svelte';

	export let notes: string;
</script>

<Markdown value={notes} />
