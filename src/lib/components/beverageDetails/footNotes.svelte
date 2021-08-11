<script lang="ts">
	import { translate } from 'svelte-intl';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const date = new Date(details.added);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const formattedDate = `${day}.${month}.${year}`;
</script>

<dl>
	<dt>
		{$translate('beverage.footnotes.added')}
	</dt>
	<dd>
		<!-- @ToDo: dates should come preformatted from the API -->
		<!-- {format(new Date(added), 'pl' === 'pl' ? 'dd.MM.yyyy' : 'dd/MM/yyyy')} -->
		{formattedDate}
	</dd>
</dl>

<style>
	dl {
		color: var(--color-grey-1);
	}
</style>
