<script lang="ts">
	import { translate } from 'svelte-intl';
	import Navigation from './Navigation.svelte';
</script>

<article>
	<h1>{$translate('stats.common.name')}</h1>
	<Navigation />
	<slot />
</article>

<style>
	:global(path.line) {
		fill: none;
		stroke-width: 5;
		stroke-linecap: round;
		cursor: pointer;
		transition: opacity var(--transition-default);
	}
</style>
