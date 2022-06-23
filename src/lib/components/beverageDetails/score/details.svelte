<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<footer transition:slide>
	<ul>
		<li>RateBeer:<br /><strong>3,70</strong> (291 głosów)</li>
		<li>Untappd:<br /><strong>3,45</strong> (1833 głosów)</li>
	</ul>
	<div>ostatnia aktualizacja 22.06.2022</div>
</footer>

<style>
	footer {
		background-color: var(--color-grey-5);
	}

	ul {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		line-height: 1.7;
	}

	li + li {
		margin-top: 0.8rem;
	}

	div {
		padding: 1rem;
		font: var(--font-weight-light) 1.4rem / 1.8rem var(--font-primary);
		color: #999;
		text-align: right;
	}
</style>
