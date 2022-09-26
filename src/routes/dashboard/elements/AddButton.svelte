<script lang="ts">
	import { cloneDeep } from 'lodash-es';

	import { emptyLanguageValue } from '../../../lib/utils/admin/emptyFieldValues';

	export let formData: any;
	export let fieldName: string;
	export let emptyValue: any = emptyLanguageValue;
	let { errors, form, touched } = formData;

	const push = () => {
		$form[fieldName] = $form[fieldName].concat(cloneDeep(emptyValue));
		$errors[fieldName] = $errors[fieldName].concat({});
		$touched[fieldName] = $touched[fieldName].concat({});
	};
</script>

<button type="button" on:click={push}>+</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: baseline;
		width: 100%;
		height: var(--size-input-height);
		padding-bottom: 0.6rem;
		background-color: var(--color-grey-4);
		font-size: 2rem;
		color: var(--color-grey-2);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	button:hover {
		background-color: var(--color-black);
		color: var(--color-grey-3);
	}
</style>
