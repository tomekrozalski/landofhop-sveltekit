<script lang="ts">
	import { translate } from 'svelte-intl';
	import Navigation from './navigation.svelte';

	const navItems = [
		{
			link: '/stats',
			name: $translate('stats.navigation.general')
		},
		{
			link: '/stats/styles',
			name: $translate('stats.navigation.styles')
		}
		// {
		// 	link: '/stats/ingredients',
		// 	name: 'Dotyczące składników'
		// }
	];
</script>

<article>
	<h1>{$translate('stats.name')}</h1>
	<Navigation {navItems} />
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
