<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/atoms/forms/Label.svelte';
	import TextInput from '$lib/atoms/forms/TextInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched } = formData;
	let fieldName = 'password';
	let id = `${formName}-${fieldName}`;
</script>

<div class="input-group">
	<Label {id} inlined isRequired>{$translate('login.password')}</Label>
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
