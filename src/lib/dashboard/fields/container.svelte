<script lang="ts">
	import { translate } from 'svelte-intl';

	import {
		ContainerMaterialBottle,
		ContainerMaterialCan,
		ContainerType
	} from '$lib/utils/enums/Beverage.enum';
	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';
	import ContainerTypeSelect from '$lib/dashboard/elements/selects/container/type.svelte';
	import ContainerMaterialSelect from '$lib/dashboard/elements/selects/container/material.svelte';
	import ContainerColorSelect from '$lib/dashboard/elements/selects/container/color.svelte';
	import ContainerUnitSelect from '$lib/dashboard/elements/selects/container/unit.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, updateField, touched, validateField } = formData;
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

	function clearUnit() {
		updateField('container.unit', '');
	}

	function getDefaultMaterial(value: ContainerType | string) {
		switch (value) {
			case ContainerType.bottle:
				return Object.keys(ContainerMaterialBottle)[0];
			case ContainerType.can:
				return Object.keys(ContainerMaterialCan)[0];
			default:
				return '';
		}
	}

	function setType(event) {
		updateField('container.type', event.detail.value);
		updateField('container.material', getDefaultMaterial(event.detail.value));
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

	function setUnit(event) {
		updateField('container.unit', event.detail.value);
		validateField('container.unit');
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
<TextInput
	errors={$errors[fieldName].value}
	fieldName={`${fieldName}.value`}
	{handleChange}
	{id}
	isTouched={$touched[fieldName].value}
	style="grid-column: 2/3"
	type="number"
	bind:value={$form[fieldName].value}
/>
<ContainerUnitSelect
	errors={$errors[fieldName].unit}
	handleClear={clearUnit}
	setValue={setUnit}
	bind:value={$form[fieldName].unit}
/>
