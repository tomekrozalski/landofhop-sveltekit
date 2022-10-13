<script lang="ts">
	import { translate } from 'svelte-intl';
	import { page } from '$app/stores';
</script>

<dl>
	<dt>{$translate('beverage.footnotes.added')}</dt>
	<dd>{$page.data.details.added}</dd>
</dl>

<style>
	dl {
		font-size: 1.6rem;

		color: var(--color-grey-1);
	}

	dt {
		display: inline;
	}

	dt::after {
		content: ':';
		margin-right: 0.4rem;
	}

	dd {
		display: inline;
		margin: 0;
	}
</style>
