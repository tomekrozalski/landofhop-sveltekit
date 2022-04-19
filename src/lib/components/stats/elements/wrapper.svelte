<script lang="ts">
	import { translate } from 'svelte-intl';
	import Navigation from './navigation.svelte';
</script>

<article>
	<h1>{$translate('stats.common.name')}</h1>
	<Navigation />
	<slot />
</article>

<style>
	:global(line) {
		stroke: var(--color-black);
	}

	:global(line.light) {
		stroke: var(--color-grey-3);
	}

	:global(text) {
		font: var(--font-weight-light) 1.2rem / 1 var(--font-primary);
	}

	:global(text.label) {
		font-weight: var(--font-weight-regular);
		font-size: 1.8rem;
	}

	:global(path.line) {
		fill: none;
		stroke-width: 5;
		stroke-linecap: round;
		cursor: pointer;
		transition: opacity var(--transition-default);
	}
</style>
