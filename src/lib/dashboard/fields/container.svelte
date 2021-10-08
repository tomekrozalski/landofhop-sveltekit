<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import ContainerTypeSelect from '$lib/dashboard/elements/selects/container/type.svelte';
	import ContainerMaterialSelect from '$lib/dashboard/elements/selects/container/material.svelte';
	import ContainerColorSelect from '$lib/dashboard/elements/selects/container/color.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, updateField, updateTouched, updateValidateField, validateField } = formData;
	let fieldName = 'container';
	let id = `${formName}-${fieldName}`;

	function clearType() {
		updateField('container.type', '');
	}

	function clearMaterial() {
		updateField('container.material', '');
	}

	function clearColor() {
		updateField('container.color', '');
	}

	function setType(event) {
		updateField('container.type', event.detail.value);
		updateField('container.material', '');
		updateField('container.color', '');
		validateField('container.type');
	}

	function setMaterial(event) {
		updateField('container.material', event.detail.value);
		validateField('container.material');
	}

	function setColor(event) {
		updateField('container.color', event.detail.value);
		validateField('container.color');
	}
</script>

<Label {id} isRequired>{$translate('dashboard.label.container')}</Label>
<ContainerTypeSelect
	errors={$errors[fieldName].type}
	handleClear={clearType}
	setValue={setType}
	bind:value={$form[fieldName].type}
/>
<ContainerMaterialSelect
	errors={$errors[fieldName].material}
	handleClear={clearMaterial}
	setValue={setMaterial}
	type={$form[fieldName].type}
	bind:value={$form[fieldName].material}
/>
<ContainerColorSelect
	errors={$errors[fieldName].color}
	handleClear={clearColor}
	setValue={setColor}
	type={$form[fieldName].type}
	bind:value={$form[fieldName].color}
/>
