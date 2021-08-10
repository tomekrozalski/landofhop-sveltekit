<script lang="ts">
	import { translate } from 'svelte-intl';
	import { format } from 'date-fns';
	import { beverage } from '$lib/utils/stores/beverage';
</script>

<dl>
	<dt>
		{$translate('beverage.footnotes.added')}
	</dt>
	<dd>
		{format(new Date($beverage.added), 'pl' === 'pl' ? 'dd.MM.yyyy' : 'dd/MM/yyyy')}
	</dd>
</dl>

<style>
	dl {
		color: var(--color-grey-1);
	}
</style>
