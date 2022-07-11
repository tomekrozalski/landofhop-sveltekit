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
		position: relative;
		z-index: var(--index-advanced-search);
	}

	a {
		display: inline-block;
		padding: 2rem;
		background-color: var(--color-white);
		transition: background-color var(--transition-default);
		color: var(--color-black);
		position: absolute;
		top: 0;
		right: 0;
	}

	a:hover {
		background-color: var(--color-grey-4);
	}
</style>
