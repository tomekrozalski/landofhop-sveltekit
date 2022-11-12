<script lang="ts">
	import { translate } from 'svelte-intl';
	import Button from '$lib/atoms/forms/Button/Button.svelte';

	let isRecalculating = false;

	const recalculate = async (e: Event) => {
		e.preventDefault();
		isRecalculating = true;

		await fetch('/api/admin/recalculate/institutions');

		isRecalculating = false;
	};
</script>

<Button
	handleClick={recalculate}
	isWarning
	isSubmitting={isRecalculating}
	isIrreversible={!isRecalculating}
	style="margin-right: auto"
>
	{$translate('modals.buttons.recalculate')}
</Button>
