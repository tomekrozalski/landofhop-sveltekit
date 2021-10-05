<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { translate } from 'svelte-intl';
	import slugify from 'slugify';

	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched, updateValidateField } = formData;
	let name = 'badge';
	let id = `${formName}-${name}`;

	let firstNameValue = $form.name[0].value;

	beforeUpdate(() => {
		const value = $form.name[0].value;
		if (value !== firstNameValue) {
			updateValidateField(name, slugify(value, { lower: true, strict: true }));
			firstNameValue = value;
		}
	});
</script>

<Label {id} isRequired>{$translate('dashboard.label.badge')}</Label>
<TextInput
	errors={$errors.badge}
	{handleChange}
	{id}
	isTouched={$touched.badge}
	{name}
	bind:value={$form.badge}
/>
