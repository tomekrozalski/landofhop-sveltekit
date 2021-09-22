<script lang="ts">
	import marked from 'marked';

	export let notes: string;
</script>

{@html marked(notes)}
