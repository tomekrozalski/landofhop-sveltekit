<script lang="ts">
	import Button from '$lib/atoms/forms/Button/Button.svelte';

	let isRecalculating = false;

	const recalculate = async (e: Event) => {
		e.preventDefault();
		isRecalculating = true;

		await fetch('/api/admin/recalculate/ingredients');

		isRecalculating = false;
	};
</script>

<Button
	handleClick={recalculate}
	isWarning
	isSubmitting={isRecalculating}
	isIrreversible={!isRecalculating}
>
	Recalculate
</Button>
