<script lang="ts">
	import AvarageScore from './AvarageScore.svelte';
	import Points from './Points.svelte';
</script>

<ul>
	<AvarageScore />
	<Points />
</ul>

<style>
	ul :global(span) {
		font-size: 1.5rem;
		color: var(--color-grey-1);
	}

	ul :global(span::before) {
		content: '(';
	}

	ul :global(span::after) {
		content: ')';
	}
</style>
