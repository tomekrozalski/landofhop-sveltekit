<script lang="ts">
	import { translate } from 'svelte-intl';

	export let updated: string;
</script>

<dl>
	<dt>{$translate('beverage.adminBar.lastTimeUpdated')}</dt>
	<dd>{updated}</dd>
</dl>

<style>
	dl {
		color: var(--color-grey-1);
		margin: 0.8rem 0;
		font-size: 1.6rem;
	}

	dt,
	dd {
		display: inline;
		margin-right: 0.5rem;
	}

	dl :global(dt::after) {
		content: ':';
	}
</style>
