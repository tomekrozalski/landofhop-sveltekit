<script lang="ts">
	import { translate } from 'svelte-intl';
</script>

<div>
	<a href="/advanced-search">
		{$translate('header.advancedSearch.link')}
	</a>
</div>

<style>
	div {
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		text-align: right;
	}

	a {
		display: inline-block;
		padding: 2rem;
		background-color: var(--color-white);
		transition: background-color var(--transition-default);
		color: var(--color-black);
	}

	a:hover {
		background-color: var(--color-grey-4);
	}
</style>
