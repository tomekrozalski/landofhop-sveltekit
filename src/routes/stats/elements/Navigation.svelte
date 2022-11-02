<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';

	const navItems = [
		{
			link: '/stats',
			name: $translate('stats.common.navigation.general'),
			url: '^/stats$'
		},
		{
			link: '/stats/styles',
			name: $translate('stats.common.navigation.styles'),
			url: '^/stats/styles$'
		},
		{
			link: '/stats/ingredients/malt',
			name: $translate('stats.common.navigation.ingredients'),
			url: '^/stats/ingredients(/.*)?$'
		}
	];
</script>

<nav>
	<ul style:grid-template-columns="repeat({navItems.length}, 1fr)">
		{#each navItems as { link, name, url }}
			<li><a class:active={$page.url.pathname.match(new RegExp(url))} href={link}>{name}</a></li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	a {
		display: flex;
		justify-content: center;
		padding: 0.6rem 1rem;
		border: 0.4rem solid var(--color-grey-5);
		color: var(--color-black);
		transition: background-color var(--transition-default);
	}

	a:hover,
	a.active {
		background-color: var(--color-grey-5);
	}

	@media (min-width: 768px) {
		ul {
			flex-direction: row;
		}

		li {
			flex: 0 1 50%;
		}
	}
</style>
