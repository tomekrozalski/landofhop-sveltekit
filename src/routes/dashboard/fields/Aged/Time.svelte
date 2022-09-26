<script lang="ts">
	import TextInput from '$lib/elements/form/TextInput.svelte';

	import TimeUnitSelect from '../../elements/selects/aged/Time.svelte';

	export let formData: any;
	export let i: number;

	let { errors, form, handleChange, touched, updateField, validateField } = formData;

	function clearUnit() {
		updateField(`aged[${i}].time.unit`, '');
	}

	function setUnit(event) {
		updateField(`aged[${i}].time.unit`, event.detail.value);
		validateField(`aged[${i}].time.unit`);
	}
</script>

<div>
	<TextInput
		errors={$errors.aged[i]?.time?.value ?? ''}
		fieldName={`aged[${i}].time.value`}
		{handleChange}
		isTouched={$touched.aged[i].time?.value}
		bind:value={$form.aged[i].time.value}
	/>
	<TimeUnitSelect
		errors={$errors.aged[i]?.time?.unit ?? ''}
		handleClear={clearUnit}
		setValue={setUnit}
		bind:value={$form.aged[i].time.unit}
	/>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1rem;
		width: 100%;
		height: var(--size-input-height);
	}
</style>
