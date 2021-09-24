<script lang="ts">
	import { translate } from 'svelte-intl';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched } = formData;
	let name = 'email';
	let id = `${formName}-${name}`;
</script>

<div class="input-group">
	<Label {id} isRequired>{$translate('login.email')}</Label>
	<TextInput
		errors={$errors.email}
		{handleChange}
		hasInvertedColors
		{id}
		isTouched={$touched.email}
		{name}
		type="email"
		bind:value={$form.email}
	/>
</div>
