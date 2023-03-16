<script lang="ts">
	import Ratings from './Ratings.svelte';
	import Timeline from './Timeline.svelte';
</script>

<section>
	<Ratings />
	<Timeline />
</section>

<style>
	section {
		display: flex;
		flex-direction: column-reverse;
		margin-inline: 2rem;
	}

	@media (min-width: 1024px) {
		section {
			display: grid;
			grid-template-columns: 1fr 1fr;
			margin-inline: 2rem;
		}
	}
</style>
