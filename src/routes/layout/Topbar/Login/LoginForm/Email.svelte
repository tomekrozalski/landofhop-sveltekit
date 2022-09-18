<script lang="ts">
	import { translate } from 'svelte-intl';

	import Label from '$lib/elements/form/Label.svelte';
	import TextInput from '$lib/elements/form/TextInput.svelte';

	export let formName: string;
	export let formData: any;
	let { errors, form, handleChange, touched } = formData;
	let fieldName = 'email';
	let id = `${formName}-${fieldName}`;
</script>

<div class="input-group">
	<Label {id} inlined isRequired>{$translate('login.email')}</Label>
	<TextInput
		errors={$errors.email}
		focusOnMount
		{handleChange}
		hasInvertedColors
		{id}
		isTouched={$touched.email}
		{fieldName}
		type="email"
		bind:value={$form.email}
	/>
</div>
