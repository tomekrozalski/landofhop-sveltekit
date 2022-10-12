<script lang="ts">
	import { translate } from 'svelte-intl';
	import {
		ContainerMaterialBottle,
		ContainerMaterialCan,
		ContainerType
	} from '$types/enums/Beverage.enum';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';
	import ContainerTypeSelect from '../selects/container/Type.svelte';
	import ContainerMaterialSelect from '../selects/container/Material.svelte';
	import ContainerColorSelect from '../selects/container/Color.svelte';
	import ContainerUnitSelect from '../selects/container/Unit.svelte';

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

	function setType(event: any) {
		updateField('container.type', event.detail.value);
		updateField('container.material', getDefaultMaterial(event.detail.value));
		updateField('container.color', '');
		validateField('container.type');
	}

	function setMaterial(event: any) {
		updateField('container.material', event.detail.value);
		validateField('container.material');
	}

	function setColor(event: any) {
		updateField('container.color', event.detail.value);
		validateField('container.color');
	}

	function setUnit(event: any) {
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
