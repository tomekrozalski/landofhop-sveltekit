<script lang="ts">
	import PreviousContentSelect from '$lib/dashboard/elements/selects/aged/PreviousContent.svelte';

	export let formData: any;
	export let i: number;

	let { errors, form, updateField, validateField } = formData;

	function clearUnit() {
		updateField(`aged[${i}].previousContent`, []);
	}

	function setUnit(event) {
		if (event?.detail) {
			updateField(
				`aged[${i}].previousContent`,
				event.detail.map(({ value }) => value)
			);
			validateField(`aged[${i}].previousContent`);
		}
	}
</script>

<PreviousContentSelect
	errors={$errors.aged[i]?.previousContent ?? ''}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form.aged[i].previousContent}
/>
