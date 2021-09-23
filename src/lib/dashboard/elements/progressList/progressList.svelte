<script>
	import EditorialIcon from './editorialIcon.svelte';
	import LabelIcon from './labelIcon.svelte';
	import ProducerIcon from './producerIcon.svelte';
</script>

<ul>
	<li class="active"><LabelIcon /></li>
	<li><ProducerIcon /></li>
	<li><EditorialIcon /></li>
</ul>

<style>
	ul {
		display: flex;
	}

	li {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 8rem;
		position: relative;
	}

	li.active::before {
		display: inline-block;
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		border: 1rem solid var(--color-brand-6);
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	li :global(svg) {
		width: 8rem;
		fill: var(--color-black);
	}
</style>
