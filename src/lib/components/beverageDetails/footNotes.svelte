<script lang="ts">
	import { translate } from 'svelte-intl';
	import { format } from 'date-fns';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { added } = details;
</script>

<dl>
	<dt>
		{$translate('beverage.footnotes.added')}
	</dt>
	<dd>
		{format(new Date(added), 'pl' === 'pl' ? 'dd.MM.yyyy' : 'dd/MM/yyyy')}
	</dd>
</dl>

<style>
	dl {
		color: var(--color-grey-1);
	}
</style>
