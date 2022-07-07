<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched } = formData;
	let fieldName = 'password';
	let id = `${formName}-${fieldName}`;
</script>

<div class="input-group">
	<Label {id} isRequired>{$translate('login.password')}</Label>
	<TextInput
		errors={$errors.password}
		{handleChange}
		hasInvertedColors
		{id}
		isTouched={$touched.password}
		{fieldName}
		type="password"
		bind:value={$form.password}
	/>
</div>
