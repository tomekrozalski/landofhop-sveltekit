<script lang="ts">
	import { translate } from 'svelte-intl';
	import { emailValidator } from '$lib/utils/fieldValidators';
	import Label from '$lib/elements/form/label.svelte';
	import TextInput from '$lib/elements/form/textInput.svelte';

	export let formStore: any;
	let { isTouched, isValid, value } = $formStore.fields.email;

	// 	name: [
	// 		{
	// 			value: 'sdfd',
	// 			language: {
	// 				label: 'polski',
	// 				id: 'pl'
	// 			}
	// 		},
	// 		{
	// 			value: 'asd',
	// 			language: {
	// 				label: 'angielski',
	// 				id: 'en'
	// 			}
	// 		}
	// 	],

	// 	name: [
	// 		{
	// 			value: {
	// 			  value: 'sdfsd',
	//        isTouched: false,
	//        isValid: false
	// 			}.
	// 			language: {
	//        value: {
	// 				  label: 'polski',
	// 			    id: 'pl'
	//        },
	//        isTouched: false,
	//        isValid: false
	// 			}
	// 		},
	// 	],

	let fieldName = 'badge';
	let formName = $formStore.summary.name;
	let id = `${formName}-${fieldName}`;
</script>

<div class="input-group">
	<Label {id} isRequired>{$translate('login.email')}</Label>
	{#each value as row}
		<TextInput
			getErrorMessage={emailValidator}
			hasInvertedColors
			{id}
			bind:isTouched
			bind:isValid
			bind:value
		/>
		<div>language</div>
	{/each}
</div>
